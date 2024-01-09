import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import API_BASE_URL from '../config';

const CodeVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const route = useRoute();
  const { phoneNumber } = route.params;
  const { email } = route.params;
  const { kodWeryfikacyjny } = route.params;

  const handleCodeInput = (text) => {
    setCode(text);
    setError('');
  };

  const handleContinue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/verifycode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          email: email,
          kodWeryfikacyjny: code,
        }),
      });
      const data = await response.json();
      
      if (data.verified) {
        navigation.navigate('Registration', {
          phoneNumber: phoneNumber,
          email: email, 
        });
      } else {
        setError('Kod jest nieprawidłowy');
      }
    } catch (error) {
      setError('Nie udało się połączyć z serwerem, spróbuj ponownie.');
      console.error('Problem z połączeniem z API:', error);
    }
  };
  

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <Text style={styles.instructionText}>Wprowadź kod weryfikacyjny</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz kod weryfikacyjny"
        value={code}
        onChangeText={handleCodeInput}
        keyboardType="number-pad"
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={code.length === 0}>
        <Text style={styles.buttonText}>Kontynuuj</Text>
      </TouchableOpacity>
      <Text style={styles.codeText}>
        Twój kod weryfikacyjny: 
        <Text style={styles.code}>{kodWeryfikacyjny}</Text>
      </Text>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: '80%',
    backgroundColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10, 
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  logo:{
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  codeText: {
    color: 'black', 
  },
  code: {
    color: 'green', 
    fontWeight: 'bold',
  },
});

export default CodeVerificationScreen;