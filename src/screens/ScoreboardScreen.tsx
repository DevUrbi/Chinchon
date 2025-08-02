
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import useGameStore from '../state/game-store';

const ScoreboardScreen = ({ navigation }: any) => {
  const { players } = useGameStore();

  const getWinner = () => {
    const activePlayers = players.filter((p) => !p.isEliminated);
    if (activePlayers.length === 1) {
      return activePlayers[0];
    }
    return null;
  };

  const winner = getWinner();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación</Text>
      {winner && (
        <Text style={styles.winnerText}>
          Ganador: {winner.name}
        </Text>
      )}
      <FlatList
        data={players.sort((a, b) => a.score - b.score)}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text>{item.isEliminated ? 'Eliminado' : item.score}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Nueva Partida" onPress={() => navigation.navigate('Setup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 18,
  },
});

export default ScoreboardScreen;
