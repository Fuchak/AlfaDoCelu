import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import API_BASE_URL from '../config';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const RegistrationScreen = ({ navigation }) => {
    const apiUrl = `${API_BASE_URL}/api/register`;
  const route = useRoute();
  const { phoneNumber, email } = route.params;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (name) => {
    setName(name);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
  };

  const handleRegistration = async () => {
    // Walidacja pól formularza
    if (!name || !password || !confirmPassword) {
      setError('Proszę upewnić się, że wszystkie pola są wypełnione.');
      return;
    }
  
    // Walidacja hasła
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Hasło musi zawierać przynajmniej 8 znaków, w tym jedną dużą literę, jeden znak specjalny i jedną cyfrę.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Hasła nie pasują do siebie!');
      console.error(error);
      return;
    }
  
    // Logika wysyłania danych do serwera
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imie: name,
          numerTelefonu: phoneNumber || '', // Jeśli nie ma numeru telefonu, ustaw pusty string
          email: email || '', // Jeśli nie ma e-maila, ustaw pusty string
          haslo: password,
          // Pozostałe pola, które są wymagane przez Twoją bazę danych
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Rejestracja udana, przenieś do kolejnego ekranu
        navigation.navigate('Login'); 
      } else {
        // Rejestracja nieudana, wyświetl błąd
        setError(data.message || 'Nie udało się zarejestrować.');
      }
    } catch (error) {
      setError('Problem z połączeniem z serwerem.');
      console.error('Problem z połączeniem z API:', error);
    }
  };
  

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <Text style={styles.label}>Podaj swoje imię:</Text>
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={name}
        onChangeText={handleNameChange}
      />
      <Text style={styles.label}>Wpisz hasło:</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Text style={styles.instructions}>
        Hasło musi zawierać co najmniej 8 znaków, w tym:{'\n'}
        - 1 dużą literę{'\n'}
        - 1 znak specjalny np. @, $, !{'\n'}
        - 1 liczbę
        </Text>
      <Text style={styles.label}>Potwierdź hasło:</Text>
      <TextInput
        style={styles.input}
        placeholder="Potwierdź hasło"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
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
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontSize: 16,
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
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  logo:{
    width: 120,
    height: 120,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationScreen;