import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import useGameStore from '../state/game-store';

const ClassificationScreen = ({ navigation }: any) => {
  const { players } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación</Text>
      <FlatList
        data={[...players].sort((a, b) => a.score - b.score)}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item.name} {item.isEliminated ? '(Eliminado)' : ''}</Text>
            <Text style={styles.playerScore}>{item.score}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
      <Button title="Continuar" onPress={() => navigation.navigate('Game')} />
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
    textAlign: 'center',
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
});

export default ClassificationScreen;