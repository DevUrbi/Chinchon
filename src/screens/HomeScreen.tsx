
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useGameStore from '../state/game-store';

const HomeScreen = ({ navigation }: any) => {
  const { loadGame, startNewGame } = useGameStore();

  const handleContinue = async () => {
    const gameExists = await loadGame();
    if (gameExists) {
      navigation.navigate('Game');
    } else {
      handleNewGame();
    }
  };

  const handleNewGame = () => {
    startNewGame();
    navigation.navigate('PlayerSetup');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="layers-outline" size={100} color="#DAA520" />
        <Text style={styles.title}>Chinchón</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>Nueva Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar Partida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
