import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EmailVerificationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailInput = (text) => {
    setEmail(text);
  };

  const isEmailValid = (email) => {
    // Prosta walidacja adresu email
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleContinue = () => {
    if (isEmailValid(email)) {
      navigation.navigate('CodeVerification');
      setError('');
    } else {
      setError('Adres email jest niepoprawny.');
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <Text style={styles.instructionText}>Wprowadź swój adres email</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz adres email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={handleEmailInput}
      />
      <Text style={styles.smallText}>Wyślemy Ci link weryfikacyjny</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Kontynuuj</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
      textAlign: 'center',
      backgroundColor: 'orange',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginVertical: 8,
    },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  logo:{
      width: 120,
      height: 120,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
});

export default EmailVerificationScreen;