import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RideHistoryScreen = ({ navigation }) => {
  // przykladowe dane na sztywno zeby bylo widac wyglad
  const [rides, setRides] = useState([
    { id: '1', date: '2023-11-05', time: '18:30', from: 'Centrum', to: 'Stare Miasto', price: '20,00 PLN', driver: 'Jan K.' },
    { id: '2', date: '2023-11-04', time: '12:15', from: 'Biurowiec', to: 'Lotnisko', price: '35,00 PLN', driver: 'Ewa B.' },

  ]);

  // Funkcja obsługująca sortowanie/filtrowanie - do implementacji po dodaniu bazy dla historii przejazdow
  const handleSortFilter = () => {
    // tutaj sortowanie/filtrowanie
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historia przejazdów</Text>
      </View>
      <TouchableOpacity style={styles.sortFilterButton} onPress={handleSortFilter}>
        <Text style={styles.sortFilterText}>Sortuj/Filtruj</Text>
      </TouchableOpacity>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rideItem}>
            <Text style={styles.rideText}>Data: {item.date}</Text>
            <Text style={styles.rideText}>Godzina: {item.time}</Text>
            <Text style={styles.rideText}>Skąd: {item.from}</Text>
            <Text style={styles.rideText}>Dokąd: {item.to}</Text>
            <Text style={styles.rideText}>Cena: {item.price}</Text>
            <Text style={styles.rideText}>Kierowca: {item.driver}</Text>
          </View>
        )}
      />
    </SafeAreaView>
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
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  sortFilterButton: {
    marginLeft: 16,
    marginTop: 10,
  },
  sortFilterText: {
    color: '#595858',
    fontSize: 13,
  },
  rideItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  rideText: {
    color: '#595858',
    fontSize: 16,
    marginBottom: 2,
  },
});

export default RideHistoryScreen;
