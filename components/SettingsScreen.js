import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  // Stan dla przechowywania danych użytkownika
  const [userData, setUserData] = useState({
    imie: '',
    nazwisko: '',
    email: '',
    lokalizacjaDom: '',
    lokalizacjaPraca: '',
  });

  useEffect(() => {
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
          lokalizacjaDom: data.lokalizacjaDom,
          lokalizacjaPraca: data.lokalizacjaDom,
        });
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };
  
  // Funkcja do aktualizacji danych użytkownika
  const saveChanges = () => {
    // Wyślij zmienione dane do API
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {Object.entries(userData).map(([key, value]) => (
        <View style={styles.settingsItem} key={key}>
          <Text style={styles.itemLabel}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: {value}</Text>
          <TouchableOpacity onPress={() => handleEdit(key)}>
            <Text style={styles.editText}>edytuj</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
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
      color: '#ffffff',
      fontSize: 16,
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: 20,
    },
    placeholderText: {
      opacity: 0, // Invisible text to balance the header
    },
    settingsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f3f3',
    },
    itemLabel: {
      fontSize: 16,
      color: '#292929',
    },
    editText: {
      fontSize: 16,
      color: '#f3a31a',
    },
  });

export default SettingsScreen;
