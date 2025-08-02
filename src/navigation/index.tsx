
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SetupScreen from '../screens/SetupScreen';
import GameScreen from '../screens/GameScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Setup">
        <Stack.Screen name="Setup" component={SetupScreen} options={{ title: 'Configuración' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Partida' }} />
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} options={{ title: 'Clasificación' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
