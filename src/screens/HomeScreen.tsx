
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useGameStore from '../state/game-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { version } from '../../package.json';

const HomeScreen = ({ navigation }: any) => {
  const { loadGame, startNewGame } = useGameStore();
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState<any[]>([]);

  useEffect(() => {
    const checkSavedGame = async () => {
      const savedGame = await AsyncStorage.getItem('chinchon-game');
      setHasSavedGame(!!savedGame);
    };
    checkSavedGame();
  }, []);

  const handleContinue = async () => {
    const gameExists = await loadGame();
    if (gameExists) {
      navigation.navigate('Game');
    } else {
      setModalTitle("No hay partida guardada");
      setModalMessage("No se encontró ninguna partida para continuar.");
      setModalButtons([{ text: "OK", onPress: () => setModalVisible(false) }]);
      setModalVisible(true);
    }
  };

  const handleNewGame = () => {
    if (hasSavedGame) {
      setModalTitle("Iniciar Nueva Partida");
      setModalMessage("Existe una partida guardada. Si inicias una nueva, la actual se perderá. ¿Estás seguro?");
      setModalButtons([
        { text: "Cancelar", onPress: () => setModalVisible(false), style: "cancel" },
        {
          text: "Sí, iniciar nueva",
          onPress: () => {
            setModalVisible(false);
            startNewGame();
            navigation.navigate('PlayerSetup');
          },
          style: "destructive"
        },
      ]);
      setModalVisible(true);
    } else {
      startNewGame();
      navigation.navigate('PlayerSetup');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="layers-outline" size={100} color="#DAA520" />
                <Text style={styles.title}>Chinchón</Text>
        <Text style={styles.version}>v{version}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>Nueva Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !hasSavedGame && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!hasSavedGame}
        >
          <Text style={styles.buttonText}>Continuar Partida</Text>
        </TouchableOpacity>
      </View>

      <AppModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        buttons={modalButtons}
      />
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
  version: {
    fontSize: 14,
    color: '#888',
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default HomeScreen;
