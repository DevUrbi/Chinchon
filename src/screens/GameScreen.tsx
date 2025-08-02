
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import useGameStore from '../state/game-store';

const GameScreen = ({ navigation }: any) => {
  const { players, currentRoundScores, updateRoundScore, nextRound, round } = useGameStore();

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
      Alert.alert(
        "Partida Terminada",
        activePlayers.length === 1 ? `El ganador es ${activePlayers[0].name}` : "Todos los jugadores han sido eliminados",
        [{ text: "OK", onPress: () => navigation.navigate('Home') }]
      );
    }
  }, [players, round, navigation]);

  const renderPlayer = ({ item }: { item: any }) => {
    if (item.isEliminated) return null;

    return (
      <View style={styles.playerRow}>
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={styles.scoreContainer}>
            <Text style={styles.playerScore}>{currentRoundScores[item.id] || 0}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="-10" onPress={() => updateRoundScore(item.id, -10)} />
                <Button title="+1" onPress={() => updateRoundScore(item.id, 1)} />
                <Button title="+5" onPress={() => updateRoundScore(item.id, 5)} />
                <Button title="+10" onPress={() => updateRoundScore(item.id, 10)} />
            </View>
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
      <Button title="Siguiente Ronda" onPress={handleNextRound} />
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
    fontSize: 18,
  },
  scoreContainer: {
    alignItems: 'flex-end'
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5
  },
});

export default GameScreen;
