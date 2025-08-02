import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import useGameStore from '../state/game-store';

const ScoreHistoryScreen = () => {
  const { players, history } = useGameStore();

  return (
    <ScrollView horizontal>
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerCell, styles.playerHeader]}>Ronda</Text>
                {players.map(player => (
                    <Text key={player.id} style={styles.headerCell}>{player.name}</Text>
                ))}
            </View>
            {history.map((roundData, index) => (
                <View key={index} style={styles.dataRow}>
                    <Text style={[styles.dataCell, styles.roundCell]}>{roundData.round}</Text>
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
  container: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerCell: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    width: 100,
    textAlign: 'center',
  },
  playerHeader: {
    width: 60,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dataCell: {
    padding: 10,
    width: 100,
    textAlign: 'center',
  },
  roundCell: {
    width: 60,
    fontWeight: 'bold',
  },
});

export default ScoreHistoryScreen;