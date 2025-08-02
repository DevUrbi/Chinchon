
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useGameStore from '../state/game-store';

const SetupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const { players, addPlayer, removePlayer, rebuyLimit, setRebuyLimit } = useGameStore();

  const handleAddPlayer = () => {
    if (name.trim()) {
      addPlayer(name.trim());
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de la Partida</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del jugador"
          value={name}
          onChangeText={setName}
        />
        <Button title="Añadir" onPress={handleAddPlayer} />
      </View>

      {players.map((player) => (
        <View key={player.id} style={styles.playerRow}>
          <Text>{player.name}</Text>
          <Button title="Eliminar" onPress={() => removePlayer(player.id)} />
        </View>
      ))}

      <View style={styles.rebuyContainer}>
        <Text>Reenganches:</Text>
        <Button title="-" onPress={() => setRebuyLimit(rebuyLimit === null ? 10 : rebuyLimit - 1)} />
        <Text style={styles.rebuyValue}>{rebuyLimit === null ? '∞' : rebuyLimit}</Text>
        <Button title="+" onPress={() => setRebuyLimit(rebuyLimit === null ? 0 : rebuyLimit + 1)} />
      </View>

      <Button
        title="Empezar Partida"
        onPress={() => navigation.navigate('Game')}
        disabled={players.length < 2}
      />
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rebuyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  rebuyValue: {
    marginHorizontal: 20,
    fontSize: 18,
  },
});

export default SetupScreen;
