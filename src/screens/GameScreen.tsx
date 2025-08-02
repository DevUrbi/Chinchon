
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import useGameStore from '../state/game-store';

const GameScreen = ({ navigation }: any) => {
  const { players, updateScore, eliminatePlayer, rebuyPlayer, rebuyLimit } = useGameStore();

  const handleUpdateScore = (id: string, amount: number) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      const newScore = player.score + amount;
      if (newScore >= 100) {
        if (rebuyLimit !== null && player.rebuys >= rebuyLimit) {
          eliminatePlayer(id);
        } else {
          rebuyPlayer(id);
        }
      } else {
        updateScore(id, amount);
      }
    }

    const activePlayers = players.filter((p) => !p.isEliminated);
    if (activePlayers.length <= 1) {
      navigation.navigate('Scoreboard');
    }
  };

  const renderPlayer = ({ item }: { item: any }) => {
    if (item.isEliminated) return null;

    return (
      <View style={styles.playerRow}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerScore}>{item.score}</Text>
        <View style={styles.buttonsContainer}>
          <Button title="-10" onPress={() => handleUpdateScore(item.id, -10)} />
          <Button title="+1" onPress={() => handleUpdateScore(item.id, 1)} />
          <Button title="+5" onPress={() => handleUpdateScore(item.id, 5)} />
          <Button title="+10" onPress={() => handleUpdateScore(item.id, 10)} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partida</Text>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
      />
      <Button title="Terminar Partida" onPress={() => navigation.navigate('Scoreboard')} />
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
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 18,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default GameScreen;
