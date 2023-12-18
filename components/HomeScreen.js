import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const defaultRegion = {
  latitude: 50.8660773,
  longitude: 20.6285677,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HomeScreen = ({ navigation, route }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(defaultRegion);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRideOrdered, setIsRideOrdered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setRegion(defaultRegion);
        setIsLoading(false);
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {
        setRegion(defaultRegion);
      }
      setIsLoading(false);
    })();
  
    if (route.params?.rideOrdered) {
      setIsRideOrdered(true);
    }else if (route.params?.rideFinished) {
      setIsRideOrdered(false);
    }
  }, [route.params?.rideOrdered, route.params?.rideFinished]);

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
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            followUserLocation={true}
            showsMyLocationButton={false}
          />
        )}
        <TouchableOpacity
          style={styles.notificationButton} 
          onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={25} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={25} color="black" />
        </TouchableOpacity>
        
        {isRideOrdered && (
        <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="information-circle" size={24} color="black" />
        </TouchableOpacity>
        )}
        
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
           <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
            >
            <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Informacje o kierowcy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Wiadomość do kierowcy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Zadzwoń do kierowcy</Text>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            if (isRideOrdered) {
              navigation.navigate('Rate');
            } else {
              navigation.navigate('OrderRide');
            }
          }}
        >
          <Text style={styles.orderButtonText}>{isRideOrdered ? "Jestem na miejscu" : "Zamów przejazd"}</Text>
        </TouchableOpacity>

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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  notificationButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 5,
    right: 10,
    width: 50, 
    height: 50,
    backgroundColor: 'white', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  menuButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 5,
    left: 10,
    width: 50,
    height: 50, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  orderButton: {
    marginBottom: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  orderButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  myLocationButton: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  infoButton: {
    position: 'absolute',
    bottom: 75,
    right: 150,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // Zapewnia, że przycisk jest pod przyciskiem 'Zamów przejazd' / 'Jestem na miejscu'
  },
  modalView: {
    position: 'absolute',
    bottom: 90,
    left: 80,
    right: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: -1, width: 0 },
    elevation: 5,
  },
  modalOption: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
