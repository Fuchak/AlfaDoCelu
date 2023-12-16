import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigations from './DrawerNavigations';
import UserProfileScreen from '../components/UserProfileScreen';
import LoadingAppScreen from '../components/LoadingAppScreen';
import RegisterChoiceScreen from '../components/RegisterChoiceScreen';
import PhoneVerificationScreen from '../components/PhoneVerificationScreen';
import EmailVerificationScreen from '../components/EmailVerificationScreen';
import CodeVerificationScreen from '../components/CodeVerificationScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import LoginScreen from '../components/LoginScreen';
import SettingsScreen from '../components/SettingsScreen';
import RideHistoryScreen from '../components/RideHistoryScreen';
import WalletScreen from '../components/WalletScreen';
import ReloadBlikScreen from '../components/ReloadBlikScreen';
import NotificationsScreen from '../components/NotificationsScreen';
import SupportScreen from '../components/SupportScreen';
import OrderRideScreen from '../components/OrderRideScreen';
import OrderRideScreen1 from '../components/OrderRideScreen1';
import RateScreen from '../components/RateScreen';
// Importuj inne ekrany, które potrzebujesz

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoadingApp" component={LoadingAppScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterChoice" component={RegisterChoiceScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DrawerNavigationScreen" component={DrawerNavigations} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RideHistory" component={RideHistoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Wallet" component={WalletScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ReloadBlik" component={ReloadBlikScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Help" component={SupportScreen} options={{headerShown: false}}/>
                <Stack.Screen name="OrderRide" component={OrderRideScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OrderRide1" component={OrderRideScreen1} options={{ headerShown: false }} />
                <Stack.Screen name="Rate" component={RateScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};