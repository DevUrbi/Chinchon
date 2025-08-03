import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useGameStore from '../state/game-store';
import AppModal from '../components/AppModal';
import ScoreModal from '../components/ScoreModal';

const GameScreen = ({ navigation }: any) => {
  const { players, currentRoundScores, updateRoundScore, nextRound, round, chinchonWin, gameEnded, gameWinnerId } = useGameStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState<any[]>([]);

  const handleNextRound = () => {
    nextRound();
    navigation.navigate('Classification');
  };

  const handleChinchon = (winnerId: string) => {
    chinchonWin(winnerId);
    setModalTitle("¡Chinchón!");
    const winner = players.find(p => p.id === winnerId);
    setModalMessage(`¡${winner?.name} ha ganado la partida con Chinchón!`);
    setModalButtons([{ text: "Ver Resultados", onPress: () => { setModalVisible(false); navigation.navigate('Classification'); } }]);
    setModalVisible(true);
  };

  const openScoreModal = (player: any) => {
    setSelectedPlayer(player);
    setScoreModalVisible(true);
  };

  const onScoreChange = (amount: number) => {
    if (selectedPlayer) {
      updateRoundScore(selectedPlayer.id, amount);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: `Ronda ${round}` });
  }, [round, navigation, gameEnded]);

  useEffect(() => {
    const activePlayers = players.filter(p => !p.isEliminated);
    if (activePlayers.length <= 1 && round > 1 && !gameEnded) {
      setModalTitle("Partida Terminada");
      setModalMessage(activePlayers.length === 1 ? `El ganador es ${activePlayers[0].name}` : "Todos los jugadores han sido eliminados");
      setModalButtons([{ text: "Ver Resultados", onPress: () => { setModalVisible(false); navigation.navigate('Classification'); } }]);
      setModalVisible(true);
    }
  }, [players, round, navigation, gameEnded]);

  const renderPlayer = ({ item }: { item: any }) => {
    const isDisabled = item.isEliminated || gameEnded;

    return (
      <TouchableOpacity
        onPress={() => !isDisabled && openScoreModal(item)}
        style={[styles.playerRow, isDisabled && styles.disabledPlayerRow]}
        disabled={isDisabled}
      >
        <Text style={[styles.playerName, isDisabled && styles.disabledPlayerText]}>{item.name}</Text>
        <Text style={[styles.playerScore, isDisabled && styles.disabledPlayerText]}>{currentRoundScores[item.id] || 0}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={handleNextRound}>
        <Text style={styles.buttonText}>Siguiente Ronda</Text>
      </TouchableOpacity>

      <AppModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        buttons={modalButtons}
      />
      <ScoreModal
        visible={scoreModalVisible}
        player={selectedPlayer}
        onClose={() => setScoreModalVisible(false)}
        onScoreChange={onScoreChange}
        onChinchon={() => selectedPlayer && handleChinchon(selectedPlayer.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 22,
    fontWeight: '500',
  },
  playerScore: {
    fontSize: 22,
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'right',
  },
  chinchonButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 15,
  },
  chinchonButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledPlayerRow: {
    opacity: 0.5,
  },
  disabledPlayerText: {
    color: '#999',
  },
});

export default GameScreen;