
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import useGameStore from '../state/game-store';

const ScoreHistoryScreen = () => {
  const { players, history } = useGameStore();

  return (
    <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Ronda</Text>
                {players.map(player => (
                    <Text key={player.id} style={styles.headerCell}>{player.name}</Text>
                ))}
            </View>
            {history.map((roundData, index) => (
                <View key={index} style={styles.dataRow}>
                    <Text style={styles.dataCell}>{roundData.round}</Text>
                    {players.map(player => (
                        <Text key={player.id} style={styles.dataCell}>
                            {roundData.scores[player.id] || '-'}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 80,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dataCell: {
    padding: 10,
    minWidth: 80,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ScoreHistoryScreen;
