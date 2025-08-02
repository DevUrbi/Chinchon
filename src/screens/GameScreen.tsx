import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useGameStore from '../state/game-store';
import AppModal from '../components/AppModal';

const GameScreen = ({ navigation }: any) => {
  const { players, currentRoundScores, updateRoundScore, nextRound, round, chinchonWin, gameEnded, gameWinnerId } = useGameStore();
  const [modalVisible, setModalVisible] = useState(false);
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
    const isDisabled = item.isEliminated || (gameEnded && item.id !== gameWinnerId);

    return (
      <View style={[styles.playerRow, isDisabled && styles.disabledPlayerRow]}>
        <Text style={[styles.playerName, isDisabled && styles.disabledPlayerText]}>{item.name}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, -10)} style={[styles.scoreButton, styles.negativeButton]} disabled={isDisabled}>
            <Text style={[styles.scoreButtonText, styles.negativeButtonText]}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, -1)} style={[styles.scoreButton, styles.negativeButton]} disabled={isDisabled}>
            <Text style={[styles.scoreButtonText, styles.negativeButtonText]}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, 1)} style={[styles.scoreButton, styles.positiveButton]} disabled={isDisabled}>
            <Text style={[styles.scoreButtonText, styles.positiveButtonText]}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, 5)} style={[styles.scoreButton, styles.positiveButton]} disabled={isDisabled}>
            <Text style={[styles.scoreButtonText, styles.positiveButtonText]}>+5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChinchon(item.id)} style={[styles.scoreButton, styles.chinchonButton]} disabled={isDisabled}>
            <Text style={[styles.scoreButtonText, styles.chinchonButtonText]}>CH</Text>
          </TouchableOpacity>
          <Text style={[styles.playerScore, isDisabled && styles.disabledPlayerText]}>{currentRoundScores[item.id] || 0}</Text>
        </View>
      </View>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerScore: {
    fontSize: 20,
    minWidth: 40,
    textAlign: 'right',
    marginLeft: 10,
  },
  scoreButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  negativeButton: {
    borderColor: '#28a745', // Green
  },
  positiveButton: {
    borderColor: '#dc3545', // Red
  },
  scoreButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  negativeButtonText: {
    color: '#28a745', // Green
  },
  positiveButtonText: {
    color: '#dc3545', // Red
  },
  chinchonButton: {
    borderColor: '#007bff',
  },
  chinchonButtonText: {
    color: '#007bff',
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