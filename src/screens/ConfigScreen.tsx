import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useGameStore from '../state/game-store';

const ConfigScreen = ({ navigation }: any) => {
  const { rebuyLimit, setRebuyLimit, scoreLimit, setScoreLimit } = useGameStore();

  const handleRebuyDecrement = () => {
    if (rebuyLimit === null) setRebuyLimit(10); // From infinity to 10
    else if (rebuyLimit > 0) setRebuyLimit(rebuyLimit - 1);
    else if (rebuyLimit === 0) setRebuyLimit(null); // From 0 to infinity
  };

  const handleRebuyIncrement = () => {
    if (rebuyLimit === null) setRebuyLimit(0); // From infinity to 0
    else setRebuyLimit(rebuyLimit + 1);
  };

  const handleScoreLimitDecrement = () => {
    if (scoreLimit > 50) setScoreLimit(scoreLimit - 10);
  };

  const handleScoreLimitIncrement = () => {
    setScoreLimit(scoreLimit + 10);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Reenganches</Text>
          <View style={styles.spinnerContainer}>
            <TouchableOpacity onPress={handleRebuyDecrement} style={styles.spinnerButton}>
              <Ionicons name="remove-circle-outline" size={40} color="#dc3545" />
            </TouchableOpacity>
            <Text style={styles.rebuyValue}>{rebuyLimit === null ? '∞' : rebuyLimit}</Text>
            <TouchableOpacity onPress={handleRebuyIncrement} style={styles.spinnerButton}>
              <Ionicons name="add-circle-outline" size={40} color="#28a745" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Límite de Puntos</Text>
          <View style={styles.spinnerContainer}>
            <TouchableOpacity onPress={handleScoreLimitDecrement} style={styles.spinnerButton}>
              <Ionicons name="remove-circle-outline" size={40} color="#dc3545" />
            </TouchableOpacity>
            <Text style={styles.rebuyValue}>{scoreLimit}</Text>
            <TouchableOpacity onPress={handleScoreLimitIncrement} style={styles.spinnerButton}>
              <Ionicons name="add-circle-outline" size={40} color="#28a745" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>Empezar Partida</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  settingLabel: {
    fontSize: 18,
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerButton: {
    padding: 5,
  },
  rebuyValue: {
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;