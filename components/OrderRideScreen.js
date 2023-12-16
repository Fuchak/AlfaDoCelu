import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderRideScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Twoja trasa</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>•</Text>
        </View>
        <TextInput
          placeholder="Wpisz adres startowy"
          style={styles.input}
        />
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Wpisz adres docelowy"
          style={styles.input}
        />
      </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('OrderRide1')}
        >
          <Text style={styles.submitButtonText}>Zamów przejazd</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between them
    padding: 16,
    backgroundColor: '#292929',
  },
  headerTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  addButton: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  circle: {
    marginRight: 10,
  },
  circleText: {
    fontSize: 30,
    color: '#007AFF',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    margin: 20,
    backgroundColor: '#FFA31A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OrderRideScreen;
