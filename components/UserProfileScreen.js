import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const UserProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState({
    imie: '',
    email: '',
    numerTelefonu: '',
  });


  useFocusEffect(
    React.useCallback(() => {
      const getUserData = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${API_BASE_URL}/api/user-profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error('Response not ok');

          const data = await response.json();
          setUserData({
            imie: data.imie,
            email: data.email,
            numerTelefonu: data.numerTelefonu,
          });
        } catch (error) {
          console.error('Błąd:', error);
        }
      };

      getUserData();
    }, [])
  );


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing the auth token:', error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {
              <Ionicons name="arrow-back" size={24} color="white" />
            }
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Settings')}}>
            {
            <Ionicons name="settings" size={24} color="white" />
            }
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('./../assets/avatar.png')} 
            style={styles.avatar}
          />
          {
          <><Text style={styles.name}>{userData.imie || 'Imię użytkownika'}</Text>
          <Text style={styles.phoneNumber}>{userData.numerTelefonu || 'Numer telefonu'}</Text>
          <Text style={styles.email}>{userData.email || 'email@example.com'}</Text></>
          }
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#292929', 
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    marginVertical: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'grey',
  },
  email: {
    fontSize: 16,
    color: 'grey',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FFA31A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
