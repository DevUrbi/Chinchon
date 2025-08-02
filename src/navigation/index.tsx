import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          contentStyle: { backgroundColor: '#fff' } // Set a default white background for all screens
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PlayerSetup" 
          component={PlayerSetupScreen} 
          options={{ title: 'Jugadores' }} 
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
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ScoreHistory')}>
                  <Ionicons name="list-outline" size={26} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Classification')}>
                  <Ionicons name="trophy-outline" size={26} color="#007bff" />
                </TouchableOpacity>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                <Ionicons name="arrow-back-outline" size={26} color="#007bff" />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: { paddingRight: 15 },
            headerLeftContainerStyle: { paddingLeft: 15 }
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