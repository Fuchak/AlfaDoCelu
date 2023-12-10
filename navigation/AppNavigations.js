import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../components/UserProfileScreen';
import LoadingAppScreen from '../components/LoadingAppScreen';
import RegisterChoiceScreen from '../components/RegisterChoiceScreen';
import PhoneVerificationScreen from '../components/PhoneVerificationScreen';
import EmailVerificationScreen from '../components/EmailVerificationScreen';
import CodeVerificationScreen from '../components/CodeVerificationScreen';
// Importuj inne ekrany, które potrzebujesz

const Stack = createStackNavigator();

export default function AppNavigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingApp" component={LoadingAppScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="RegisterChoice" component={RegisterChoiceScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="CodeVerification" component={CodeVerificationScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};