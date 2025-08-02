import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import ConfigScreen from '../screens/ConfigScreen';
import GameScreen from '../screens/GameScreen';
import ScoreHistoryScreen from '../screens/ScoreHistoryScreen';
import ClassificationScreen from '../screens/ClassificationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Chinchón Calculator' }} 
        />
        <Stack.Screen 
          name="PlayerSetup" 
          component={PlayerSetupScreen} 
          options={{ title: 'Añadir Jugadores' }} 
        />
        <Stack.Screen 
          name="Config" 
          component={ConfigScreen} 
          options={{ title: 'Configuración' }} 
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={({ navigation }) => ({ 
            title: 'Partida',
            headerRight: () => (
              <>
                <TouchableOpacity onPress={() => navigation.navigate('ScoreHistory')} style={{ marginRight: 15 }}>
                  <Ionicons name="list" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Classification')}>
                  <Ionicons name="stats-chart" size={24} color="black" />
                </TouchableOpacity>
              </>
            ),
            headerLeft: () => null, // Removes back button
          })} 
        />
        <Stack.Screen 
          name="ScoreHistory" 
          component={ScoreHistoryScreen} 
          options={{ title: 'Historial' }} 
        />
        <Stack.Screen 
          name="Classification" 
          component={ClassificationScreen} 
          options={{ title: 'Clasificación' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;