
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useGameStore from '../state/game-store';

const ConfigScreen = ({ navigation }: any) => {
  const { rebuyLimit, setRebuyLimit } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de la Partida</Text>
      <View style={styles.rebuyContainer}>
        <Text>Reenganches:</Text>
        <Button title="-" onPress={() => setRebuyLimit(rebuyLimit === null ? 10 : rebuyLimit - 1)} />
        <Text style={styles.rebuyValue}>{rebuyLimit === null ? '∞' : rebuyLimit}</Text>
        <Button title="+" onPress={() => setRebuyLimit(rebuyLimit === null ? 0 : rebuyLimit + 1)} />
      </View>
      <Button title="Empezar Partida" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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

export default ConfigScreen;
