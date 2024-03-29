import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import API_BASE_URL from '../config';

const PhoneVerificationScreen = ({ navigation }) => {
  const apiUrl = `${API_BASE_URL}/api/sendcode`;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneInput = (text) => {
    const newText = text.replace(/[^0-9]/g, ''); // Usuwa wszystko oprócz cyfr
    if (newText.length <= 9) {
      setPhoneNumber(newText);
    }
  };

  const handleContinue = async () => {
    if (phoneNumber.length === 9) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numerTelefonu: phoneNumber }),
        });
  
        if (response.status === 409) {
          setError('Użytkownik z tym numerem telefonu już istnieje.');
          return;
        }
        
        const data = await response.json();
        if (response.status === 200 && data.kodWeryfikacyjny) {
          navigation.navigate('CodeVerification', { phoneNumber: phoneNumber, kodWeryfikacyjny: data.kodWeryfikacyjny  });
        } else {
          setError('Nie udało się uzyskać kodu weryfikacyjnego.');
        }
      } catch (error) {
        console.error(error);
        setError('Wystąpił błąd podczas łączenia z serwerem.');
      }
    } else {
      setError('Numer telefonu jest niepoprawny.');
    }
  };
  

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <Text style={styles.instructionText}>Wprowadź swój numer telefonu</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz numer telefonu"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneInput}
      />
      <Text style={styles.smallText}>Wyślemy Ci SMS z kodem w celu weryfikacji</Text>
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

export default PhoneVerificationScreen;