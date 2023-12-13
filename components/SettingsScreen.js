import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import API_BASE_URL from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [error, setError] = useState('');
  const [editField, setEditField] = useState(null);
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
          lokalizacjaPraca: data.lokalizacjaPraca,
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
  
  const saveChanges = async () => {
    if (editField === 'email' && !isEmailValid(userData.email)) {
      handleError('Email jest niepoprawny.');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/api/user-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Wystąpił błąd podczas aktualizacji ustawień.');
      return;
     }
  
      console.log('Ustawienia zaaktualizowane:', data);
      handleError('Ustawienia zostały zaktualizowane.');
      setEditField(null);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = () => {
    saveChanges();
    setEditField(null);
  };

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handlePhoneInput = (text) => {
    const newText = text.replace(/[^0-9]/g, '');
    if (newText.length <= 9) {
      handleUpdate('numerTelefonu', newText);
    }
  };

  const handleError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };
  
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack( )}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Ustawienia</Text>
    </View>
    {Object.entries(userData).map(([key, value]) => (
      <View style={styles.settingsItem} key={key}>
        <Text style={styles.itemLabel}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</Text>
        {editField === key ? (
        key === 'numerTelefonu' ? (
            <TextInput
            style={styles.textInput}
            onChangeText={handlePhoneInput}
            value={value}
            keyboardType='numeric'
            autoFocus
            />
        ) : (
            <TextInput
            style={styles.textInput}
            onChangeText={(text) => handleUpdate(key, text)}
            value={value}
            autoFocus
            />
        )
        ) : (
        <Text style={styles.itemValue}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => editField === key ? handleSave(key) : handleEdit(key)}>
          <Text style={styles.editText}>{editField === key ? 'zapisz' : 'edytuj'}</Text>
        </TouchableOpacity>
      </View>
    ))}
    {error && <Text style={error.includes('zaktualizowane') ? styles.successText : styles.errorText}>{error}</Text>}
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#292929',
      },
      headerTitle: {
        flex: 1, 
        textAlign: 'center',
        paddingRight: 25,
        color: 'white',
        fontSize: 20,
      },
    settingsItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
    },
    itemLabel: {
      flex: 1,
      fontSize: 16,
    },
    itemValue: {
      flex: 2,
      fontSize: 16,
    },
    textInput: {
      flex: 2,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    editText: {
      padding: 5,
      color: 'orange',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
    successText: {
      color: 'green',
      marginBottom: 10,
      textAlign: 'center',
    },
  });

export default SettingsScreen;
