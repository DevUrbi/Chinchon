import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useGameStore from '../state/game-store';
import AppModal from '../components/AppModal';

const GameScreen = ({ navigation }: any) => {
  const { players, currentRoundScores, updateRoundScore, nextRound, round } = useGameStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState<any[]>([]);

  const handleNextRound = () => {
    nextRound();
    navigation.navigate('Classification');
  };

  useEffect(() => {
    navigation.setOptions({ title: `Ronda ${round}` });
  }, [round, navigation]);

  useEffect(() => {
    const activePlayers = players.filter(p => !p.isEliminated);
    if (activePlayers.length <= 1 && round > 1) {
      setModalTitle("Partida Terminada");
      setModalMessage(activePlayers.length === 1 ? `El ganador es ${activePlayers[0].name}` : "Todos los jugadores han sido eliminados");
      setModalButtons([{ text: "OK", onPress: () => { setModalVisible(false); navigation.navigate('Home'); } }]);
      setModalVisible(true);
    }
  }, [players, round, navigation]);

  const renderPlayer = ({ item }: { item: any }) => {
    if (item.isEliminated) return null;

    return (
      <View style={styles.playerRow}>
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, -10)} style={[styles.scoreButton, styles.negativeButton]}>
            <Text style={[styles.scoreButtonText, styles.negativeButtonText]}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, -1)} style={[styles.scoreButton, styles.negativeButton]}>
            <Text style={[styles.scoreButtonText, styles.negativeButtonText]}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, 1)} style={[styles.scoreButton, styles.positiveButton]}>
            <Text style={[styles.scoreButtonText, styles.positiveButtonText]}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateRoundScore(item.id, 5)} style={[styles.scoreButton, styles.positiveButton]}>
            <Text style={[styles.scoreButtonText, styles.positiveButtonText]}>+5</Text>
          </TouchableOpacity>
          <Text style={styles.playerScore}>{currentRoundScores[item.id] || 0}</Text>
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
});

export default GameScreen;