import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CodeVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const route = useRoute();
  const { phoneNumber } = route.params;

  const handleCodeInput = (text) => {
    setCode(text);
    setError(''); // Clear error when user starts typing
  };

  const handleContinue = async () => {
    try {
      const response = await fetch('http://192.168.0.42:3000/api/verifycode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // numer telefonu przekazany z poprzedniego ekranu
          kodWeryfikacyjny: code,
        }),
      });
      const data = await response.json();
      
      if (data.verified) {
        // Kod jest prawidłowy, przejdź do następnego ekranu
        //navigation.navigate('NextScreenName');
      } else {
        // Kod jest nieprawidłowy, wyświetl błąd
        setError('Kod jest nieprawidłowy');
      }
    } catch (error) {
      // W przypadku błędu komunikacji z serwerem, wyświetl odpowiedni komunikat
      setError('Nie udało się połączyć z serwerem, spróbuj ponownie.');
      console.error('Problem z połączeniem z API:', error);
    }
  };
  

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <Text style={styles.infoText}>Kod został wysłany</Text>
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
  infoText: {
    fontSize: 16,
    marginBottom: 20,
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
    backgroundColor: '#ff9500', // Kolor przycisku
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10, // Odstęp od inputu
  },
  buttonText: {
    fontSize: 20,
    color: '#fff', // Kolor tekstu
    fontWeight: 'bold',
  },
  logo:{
    width: 120,
    height: 120,
  },
});

export default CodeVerificationScreen;