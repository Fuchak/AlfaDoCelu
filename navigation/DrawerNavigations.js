import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../components/HomeScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
    const navigateAndCloseDrawer = (screenName) => {
        navigation.navigate(screenName);
        navigation.closeDrawer();
    };

    return (
        <View style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.closeDrawer()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={styles.drawerItem} onPress={() => navigateAndCloseDrawer('UserProfile')}>Profil</Text>
            <Text style={styles.drawerItem} onPress={() => navigateAndCloseDrawer('Wallet')}>Portfel</Text>
            <Text style={styles.drawerItem} onPress={() => navigateAndCloseDrawer('RideHistory')}>Historia przejazdów</Text>
            <Text style={styles.drawerItem} onPress={() => navigateAndCloseDrawer('Help')}>Pomoc</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    drawerItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'orange',
        elevation: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        textAlign: 'center',
    },
    drawerHeader: {
        height: 50,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: StatusBar.currentHeight,
    },
    backButton: {
        marginLeft: 250,
        marginTop: -25,
    },
});

function DrawerNavigationScreen() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigationScreen;