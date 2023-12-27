import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const ReloadBlikScreen = ({navigation}) => {
  
  const [amount, setAmount] = useState('');
  const [blikCode, setBlikCode] = useState(['', '', '', '', '', '']);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const blikInputRefs = useRef(blikCode.map(() => React.createRef()));

  const handleReload = async () => {
    const joinedBlikCode = blikCode.join('');
    const parsedAmount = parseFloat(amount);

    if (!isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Błąd", "Wprowadź prawidłową kwotę.");
      return;
    }

    setIsCodeValid(true);
    Keyboard.dismiss();

    try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${API_BASE_URL}/api/reload-account`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parsedAmount, blikCode: joinedBlikCode }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      Alert.alert("Doładowanie", "Konto zostało doładowane.");
    } else {
      setIsCodeValid(false);
      Alert.alert("Błąd", responseData.message || "Kod BLIK jest nieprawidłowy.");
    }
  } catch (error) {
    console.error('Błąd:', error);
    Alert.alert("Błąd", "Nie udało się doładować konta.");
  }
  };

  const handleBlikCodeChange = (text, index) => {
    const newBlikCode = [...blikCode];
    newBlikCode[index] = text;
    setBlikCode(newBlikCode);

    // Przejście do następnego pola po wpisaniu cyfry
    if (text && index < blikCode.length - 1) {
      blikInputRefs.current[index + 1].focus();
    }
  
    // Powrót do poprzedniego pola po usunięciu cyfry
    if (!text && index > 0) {
      blikInputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>

       <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wpłacanie środków BLIKiem</Text>
      </View>

    <View style={styles.body}>
      <Text style={styles.label}>Wpisz wybraną kwotę:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Kwota doładowania"
      />

      <Text style={styles.label}>Wpisz kod BLIK:</Text>
      <View style={styles.blikCodeContainer}>
        {blikCode.map((code, index) => (
        <TextInput
          key={index}
          ref={el => (blikInputRefs.current[index] = el)}
          style={[styles.blikInput, !isCodeValid && styles.inputError]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleBlikCodeChange(text, index)}
          value={code}
        />
      ))}
      </View>
      {!isCodeValid && <Text style={styles.errorText}>Kod BLIK jest nieprawidłowy</Text>}

      <TouchableOpacity style={styles.button} onPress={handleReload}>
        <Text style={styles.buttonText}>Wpłać</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1', // Tło z palety
    paddingTop: StatusBar.currentHeight,
  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#292929', // Tło nagłówka
  },
  body: {
    padding: 10,
  },
  backButton: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff', // Biały tekst dla tytułu
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    color: '#303030',
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    
  },
  blikCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  blikInput: {
    width: 40,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#929292',
    textAlign: 'center',
    fontSize: 18,
    color: '#303030',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f3a13a', // Kolor przycisku z palety
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReloadBlikScreen;