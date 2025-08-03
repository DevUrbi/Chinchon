
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useGameStore from '../state/game-store';

const PlayerSetupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const { players, addPlayer, removePlayer, startNewGame } = useGameStore();

  useEffect(() => {
    startNewGame();
  }, []);

  const handleAddPlayer = () => {
    if (name.trim()) {
      addPlayer(name.trim());
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del jugador"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={handleAddPlayer} style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={40} color="#28a745" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removePlayer(item.id)} style={styles.iconButton}>
              <Ionicons name="remove-circle-outline" size={40} color="#dc3545" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={[styles.button, players.length < 2 && styles.disabledButton]}
        disabled={players.length < 2}
        onPress={() => navigation.navigate('Config')}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 18,
  },
  iconButton: {
    padding: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default PlayerSetupScreen;
