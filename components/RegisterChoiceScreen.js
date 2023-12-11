import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterChoiceScreen = ({ navigation }) => {

  const handleContinueWithPhone = () => {
    navigation.navigate('PhoneVerification');
  };

  const handleContinueWithEmail = () => {
    navigation.navigate('EmailVerification');
  };

  return (
    <View style={styles.container}>
        <Image source={require('./../assets/AlfaDoCelu.png')} style={styles.logo}/>
      <TouchableOpacity style={styles.button} onPress={handleContinueWithPhone}>
        <Text style={styles.buttonText}>Zarejestruj za pomocą numeru telefonu</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>lub</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinueWithEmail}>
        <Text style={styles.buttonText}>Zarejestruj się za pomocą email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logo:{
    width: 120,
    height: 120,
  },
  orText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default RegisterChoiceScreen;