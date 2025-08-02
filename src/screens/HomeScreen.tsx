import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import useGameStore from '../state/game-store';

const HomeScreen = ({ navigation }: any) => {
  const { loadGame, startNewGame } = useGameStore();

  const handleContinue = async () => {
    const gameExists = await loadGame();
    if (gameExists) {
      navigation.navigate('Game');
    } else {
      // Opcional: mostrar un alert o mensaje de que no hay partida guardada
      handleNewGame();
    }
  };

  const handleNewGame = () => {
    startNewGame();
    navigation.navigate('PlayerSetup');
  }

  return (
    <View style={styles.container}>
      <Button title="Iniciar Nueva Partida" onPress={handleNewGame} />
      <Button title="Continuar Partida" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
});

export default HomeScreen;