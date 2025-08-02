import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useGameStore from "../state/game-store";

const ClassificationScreen = ({ navigation }: any) => {
  const { players, gameWinnerId } = useGameStore();

  const sortedPlayers = [...players].sort((a, b) => {
    if (gameWinnerId) {
      if (a.id === gameWinnerId) return -1;
      if (b.id === gameWinnerId) return 1;
    }
    if (a.isEliminated && !b.isEliminated) return 1;
    if (!a.isEliminated && b.isEliminated) return -1;
    return a.score - b.score;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPlayers}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.playerRow,
              index === 0 && styles.firstPlace,
              index === 1 && styles.secondPlace,
              index === 2 && styles.thirdPlace,
              item.isEliminated && styles.eliminatedPlayer,
            ]}
          >
            <Text style={styles.positionText}>{index + 1}.</Text>
            <Text
              style={[
                styles.playerName,
                item.isEliminated && styles.eliminatedPlayerText,
              ]}
            >
              {item.name} {item.id === gameWinnerId && '(CH)'}
            </Text>
            <Text
              style={[
                styles.playerScore,
                item.isEliminated && styles.eliminatedPlayerText,
              ]}
            >
              {item.isEliminated ? "Eliminado" : item.score}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  positionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  playerName: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  playerScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  firstPlace: {
    backgroundColor: "#FFD700", // Gold
  },
  secondPlace: {
    backgroundColor: "#C0C0C0", // Silver
  },
  thirdPlace: {
    backgroundColor: "#CD7F32", // Bronze
  },
  eliminatedPlayer: {
    backgroundColor: "#ffcccc",
    opacity: 0.6,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  eliminatedPlayerText: {
    color: "#999",
    textDecorationLine: "line-through",
  },
});

export default ClassificationScreen;
