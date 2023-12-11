import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailOrPhoneChange = (input) => {
    setEmailOrPhone(input);
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
  };

  const handleLogin = () => {
    // Logika dla logowania (np. walidacja danych, wysyłanie zapytania do serwera)
    // ...
    // Następnie przenieś do kolejnego ekranu po pomyślnym logowaniu
    // navigation.navigate('HomeScreen'); // Zastąp 'HomeScreen' rzeczywistą nazwą docelowego ekranu
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      
      <Text style={styles.label}>Email lub numer telefonu:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email/Telefon"
        keyboardType="email-address"
        value={emailOrPhone}
        onChangeText={handleEmailOrPhoneChange}
      />

      <Text style={styles.label}>Hasło:</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
    fontWeight: 'bold',
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
  button: {
    height: 50,
    width: '80%',
    backgroundColor: '#f0ad4e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
   errorText: {
     color: 'red',
     marginTop: 10,
   }
});

export default LoginScreen;