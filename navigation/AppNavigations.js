import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../components/UserProfileScreen';
import LoadingAppScreen from '../components/LoadingAppScreen';
import RegisterChoiceScreen from '../components/RegisterChoiceScreen';
// Importuj inne ekrany, które potrzebujesz

const Stack = createStackNavigator();

export default function AppNavigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingApp" component={LoadingAppScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterChoice" component={RegisterChoiceScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};