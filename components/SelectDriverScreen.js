import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const DriverItem = ({ driver, onSelectDriver, isSelected }) => (
  <TouchableOpacity
    onPress={() => onSelectDriver(driver)}
    style={[styles.driverItem, isSelected && styles.selectedDriver]}
  >
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{driver.initials}</Text>
    </View>
    <View style={styles.itemContainer}>
      <Text style={styles.driverDistance}>{driver.name}</Text>
      <Text style={styles.driverDistance}>Ocena: {driver.rating}</Text>
      <Text style={styles.driverDistance}>Odległość: {driver.distance}</Text>
    </View>
  </TouchableOpacity>
);

const SelectDriverScreen = ({ navigation }) => {
  const [driversData, setDriversData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/kierowcy`);
        const data = await response.json();
        setDriversData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania listy kierowców:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver.id);
    // Tutaj dodaj logikę dla wyboru kierowcy
  };

  const onConfirmRide = async () => {
    if (selectedDriver) {
      // Wywołanie funkcji przekazanej z HomeScreen
      try {
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_BASE_URL}/api/kierowcy/update-status`, {
          method: 'POST',
          headers: {

            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ kierowcaId: selectedDriver }),
        });
  
        navigation.navigate('Home');
      } catch (error) {
        console.error('Błąd:', error);
        alert('Nie udało się zaktualizować statusu kierowcy.');
      }
    } else {
      alert('Proszę wybrać kierowcę');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wybierz kierowcę:</Text>
      </View>

      <FlatList
        data={driversData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DriverItem
            driver={item}
            onSelectDriver={handleSelectDriver}
            isSelected={selectedDriver === item.id}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={onConfirmRide}>
        <Text style={styles.buttonText}>W drogę!</Text>
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
    padding: 16,
    backgroundColor: '#292929',
  },
    headerTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  driverItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  selectedDriver: {
    backgroundColor: '#e2e2e2',
  },
  avatarContainer: {
    marginRight: 16,
    backgroundColor: 'orange',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
  },
  driverDistance: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 25,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
    itemContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default SelectDriverScreen;