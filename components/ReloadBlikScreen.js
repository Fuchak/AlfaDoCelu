import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReloadBlikScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [blikCode, setBlikCode] = useState(['', '', '', '', '', '']);
  const [isCodeValid, setIsCodeValid] = useState(true);

  const handleReload = () => {
    if (blikCode.every(code => code.length === 1)) {
      setIsCodeValid(true);
      Keyboard.dismiss();
      // Logika doładowania...
      Alert.alert("Doładowanie", "Konto zostało doładowane.");
    } else {
      setIsCodeValid(false);
    }
  };

  const handleBlikCodeChange = (text, index) => {
    const newBlikCode = [...blikCode];
    newBlikCode[index] = text;
    setBlikCode(newBlikCode);
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