import React, {useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const OrderRideScreen1 = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);
  
//Zamyka okno modalne po powrocie na tą stronę dzieki czemu działają przyciski
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (modalVisible) {
        setModalVisible(false);
      }
    });
    return unsubscribe;
  }, [navigation, modalVisible]);

  const goToCurrentLocation = () => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wybrana ulica</Text>
      </View>

      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 50.8660773,
          longitude: 20.6285677,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.payButtonText}>Wybierz formę płatności</Text>
      </TouchableOpacity>

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
              onPress={() => [navigation.navigate('SelectDriver'), setModalVisible(false)]}
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
      <TouchableOpacity
          style={styles.myLocationButton}
          onPress={goToCurrentLocation}>
        <Ionicons name="locate" size={25} color="black" />
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
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  payButtonText: {
    fontSize: 20,
    color: '#fff',
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
  myLocationButton: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
});

export default OrderRideScreen1;