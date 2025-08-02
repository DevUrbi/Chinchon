import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, Player } from '../types';

interface ChinchonGameState extends GameState {
  round: number;
  history: any[];
  currentRoundScores: { [playerId: string]: number };
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updateRoundScore: (id: string, amount: number) => void;
  setRebuyLimit: (limit: number | null) => void;
  nextRound: () => void;
  loadGame: () => Promise<boolean>;
  startNewGame: () => void;
}

const useGameStore = create<ChinchonGameState>((set, get) => ({
  players: [],
  rebuyLimit: null,
  round: 1,
  history: [],
  currentRoundScores: {},

  addPlayer: (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      score: 0,
      rebuys: 0,
      isEliminated: false,
    };
    set((state) => {
      const newPlayers = [...state.players, newPlayer];
      const newCurrentScores = { ...state.currentRoundScores, [newPlayer.id]: 0 };
      return { players: newPlayers, currentRoundScores: newCurrentScores };
    });
  },

  removePlayer: (id: string) => {
    set((state) => {
      const newPlayers = state.players.filter((p) => p.id !== id);
      const newCurrentScores = { ...state.currentRoundScores };
      delete newCurrentScores[id];
      return { players: newPlayers, currentRoundScores: newCurrentScores };
    });
  },

  updateRoundScore: (id: string, amount: number) => {
    set((state) => ({
      currentRoundScores: {
        ...state.currentRoundScores,
        [id]: (state.currentRoundScores[id] || 0) + amount,
      },
    }));
  },

  setRebuyLimit: (limit: number | null) => {
    set({ rebuyLimit: limit });
  },

  nextRound: () => {
    const { players, rebuyLimit, history, currentRoundScores, round } = get();
    
    // 1. Save current round scores to history
    const roundHistory = { round, scores: { ...currentRoundScores } };
    const newHistory = [...history, roundHistory];

    // 2. Add round scores to total scores
    let playersWithNewTotal = players.map(p => ({
        ...p,
        score: p.score + (currentRoundScores[p.id] || 0)
    }));

    // 3. Apply elimination and rebuy logic
    const updatedPlayers = playersWithNewTotal.map(player => {
        if (player.isEliminated) return player;

        if (player.score >= 100) {
            if (rebuyLimit !== null && player.rebuys >= rebuyLimit) {
                return { ...player, isEliminated: true };
            } else {
                const highestScore = Math.max(
                    ...playersWithNewTotal
                        .filter(p => !p.isEliminated && p.id !== player.id)
                        .map(p => p.score)
                );
                return { 
                    ...player, 
                    score: highestScore, 
                    rebuys: player.rebuys + 1 
                };
            }
        }
        return player;
    });

    // 4. Reset round scores and increment round number
    const newCurrentScores = Object.keys(currentRoundScores).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

    set({
      players: updatedPlayers,
      history: newHistory,
      round: round + 1,
      currentRoundScores: newCurrentScores,
    });

    AsyncStorage.setItem('chinchon-game', JSON.stringify(get()));
  },

  loadGame: async () => {
    const savedGame = await AsyncStorage.getItem('chinchon-game');
    if (savedGame) {
      const gameState = JSON.parse(savedGame);
      set(gameState);
      return true;
    }
    return false;
  },

  startNewGame: () => {
    set({ players: [], history: [], rebuyLimit: null, round: 1, currentRoundScores: {} });
    AsyncStorage.removeItem('chinchon-game');
  }
}));

export default useGameStore;