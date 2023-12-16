import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const OrderRideScreen1 = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePaymentSelection = (option) => {
    // Implementacja logiki po wyborze formy płatności
    console.log('Wybrano metodę płatności:', option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Przycisk powrotu i adres startowy */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Wybrana ulica</Text>
      </View>
      
    <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {/* Dolne menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.payButtonText}>Wybierz formę płatności</Text>
        </TouchableOpacity>
      </View>

      {/* Modal wyboru płatności */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Wybierz formę płatności:</Text>
            <TouchableOpacity
              style={styles.orangeButton}
              onPress={() => handlePaymentSelection('Portfel')}
            >
              <Text style={styles.orangeButtonText}>Portfel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orangeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.orangeButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  map: {
    flex: 1,
  },
  bottomMenu: {
    height: 150,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  payButton: {
    margin: 20,
    backgroundColor: '#FFA31A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  orangeButton: {
    backgroundColor: '#FFA500', // Pomarańczowy kolor
    borderRadius: 25, // Zaokrąglenie krawędzi
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 200, // Ustaw szerokość zgodnie z potrzebami
  },
  orangeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderRideScreen1;