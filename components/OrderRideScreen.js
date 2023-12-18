import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const OrderRideScreen = ({ navigation }) => {
  const [showStopInput, setShowStopInput] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');

  const handleAddStop = () => {
    setShowStopInput(!showStopInput);
  };

  const loadCurrentAddress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);
    if (geocode.length > 0) {
      setCurrentAddress(`${geocode[0].street}, ${geocode[0].city}`);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Twoja trasa</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddStop}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Wpisz adres startowy"
          style={styles.input}
          value={currentAddress}
          onChangeText={text => setCurrentAddress(text)}
        />
        <TouchableOpacity style={styles.locationButton} onPress={loadCurrentAddress}>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {showStopInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Wpisz adres przystanku"
            style={styles.input}
          />
        </View>
      )}
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
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 16,
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
  locationButton: {
    marginLeft: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
});

export default OrderRideScreen;
