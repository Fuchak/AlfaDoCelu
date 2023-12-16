import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {
          <Ionicons name="arrow-back" size={24} color="white" />
        }
        </TouchableOpacity>
        <Text style={styles.headerText}>Pomoc</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Wpisz temat problemu"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Opisz swój problem"
        placeholderTextColor="#000"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Wyślij zgłoszenie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // tło całego kontenera
  },
  backButton: {
    padding: 16,
    marginRight: 16, // dodaj trochę miejsca z prawej strony, jeśli potrzebujesz
  },
  backButtonText: {
    color: '#ffffff', // kolor tekstu przycisku
    fontSize: 20, // możesz dostosować rozmiar tekstu
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#000000', // tło nagłówka
    padding: 16,
  },
  headerText: {
    color: '#ffffff', // kolor tekstu nagłówka
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffff', // białe tło dla inputów
    borderColor: '#000000', // kolor obramowania inputów
    borderWidth: 1,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f1a11b', // kolor tła przycisku
    padding: 16,
    margin: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // kolor tekstu przycisku
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default SupportScreen;
