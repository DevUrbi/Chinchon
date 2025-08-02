import { create } from "zustand";
import { GameState, Player } from "../types";

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updateScore: (id: string, amount: number) => void;
  setRebuyLimit: (limit: number | null) => void;
  eliminatePlayer: (id: string) => void;
  rebuyPlayer: (id: string) => void;
}

const useGameStore = create<GameStore>((set, get) => ({
  players: [] as Player[],
  rebuyLimit: null,

  addPlayer: (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      score: 0,
      rebuys: 0,
      isEliminated: false,
    };
    set((state: GameState) => ({ players: [...state.players, newPlayer] }));
  },

  removePlayer: (id: string) => {
    set((state: GameState) => ({
      players: state.players.filter((p) => p.id !== id),
    }));
  },

  updateScore: (id: string, amount: number) => {
    set((state: GameState) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, score: p.score + amount } : p
      ),
    }));
  },

  setRebuyLimit: (limit: number | null) => {
    set({ rebuyLimit: limit });
  },

  eliminatePlayer: (id: string) => {
    set((state: GameState) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, isEliminated: true } : p
      ),
    }));
  },

  rebuyPlayer: (id: string) => {
    const highestScore = Math.max(...get().players.map((p) => p.score));
    set((state: GameState) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, score: highestScore, rebuys: p.rebuys + 1 } : p
      ),
    }));
  },
}));

export default useGameStore;
