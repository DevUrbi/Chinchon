import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useGameStore from "../state/game-store";

const ScoreHistoryScreen = () => {
  const { players, history } = useGameStore();

  return (
    <ScrollView horizontal style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.roundHeaderCell}></Text>
          {players.map((player) => (
            <Text key={player.id} style={styles.playerHeaderCell}>
              {player.name}
            </Text>
          ))}
        </View>
        <View style={styles.totalScoreRow}>
          <Text style={styles.roundDataCell}>Total</Text>
          {players.map((player) => {
            const totalScore = history.reduce(
              (sum, roundData) => sum + (roundData.scores[player.id] || 0),
              0
            );
            return (
              <Text key={player.id} style={styles.playerDataCell}>
                {totalScore}
              </Text>
            );
          })}
        </View>
        {history.map((roundData, index) => (
          <View
            key={index}
            style={[
              styles.dataRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <Text style={styles.roundDataCell}>{roundData.round}</Text>
            {players.map((player) => {
              const score = roundData.scores[player.id];
              const scoreStyle =
                score > 0
                  ? styles.positiveScore
                  : score < 0
                  ? styles.negativeScore
                  : null;
              return (
                <Text
                  key={player.id}
                  style={[styles.playerDataCell, scoreStyle]}
                >
                  {score || "-"}
                </Text>
              );
            })}
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
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    backgroundColor: "#f0f0f0",
  },
  totalScoreRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    backgroundColor: "#e0e0e0",
  },
  roundHeaderCell: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
    width: 60, // Fixed width for Ronda column
    textAlign: "center",
  },
  playerHeaderCell: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  roundDataCell: {
    padding: 10,
    width: 60, // Fixed width for Ronda column
    textAlign: "center",
    fontSize: 16,
  },
  playerDataCell: {
    padding: 10,
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  positiveScore: {
    color: "red",
  },
  negativeScore: {
    color: "green",
  },
});

export default ScoreHistoryScreen;
