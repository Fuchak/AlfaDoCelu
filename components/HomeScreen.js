import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator, StatusBar, Image  } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const defaultRegion = {
  latitude: 50.8660773,
  longitude: 20.6285677,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HomeScreen = ({ navigation}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(defaultRegion);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRideOrdered, setIsRideOrdered] = useState(false);
  const [SelectedDriverID, setSelectedDriverId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [isUserLocated, setIsUserLocated] = useState(false);
  const [isMagnetometerActive, setIsMagnetometerActive] = useState(false);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const fetchRideStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/get-ride-status`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setIsRideOrdered(data.isRideOrdered);
          setSelectedDriverId(data.selectedDriverId);
        } catch (error) {
          console.error('Błąd:', error);
        }
      }
    };
  
    const unsubscribe = navigation.addListener('focus', fetchRideStatus);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let subscription;
    if (isMagnetometerActive) {
      subscription = Magnetometer.addListener(data => {
        const angle = _angle(data);
        setHeading(angle);
      });
    } else {
      subscription && subscription.remove();
    }
  
    return () => {
      subscription && subscription.remove();
    };
  }, [isMagnetometerActive]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Odmowa dostępu do lokalizacji');
        setRegion(defaultRegion); // Ustaw domyślny region
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
        //Wyciszamy błąd gdy nie damy uprawnień lokalizacji bo po co ma nam się wyświetlać
        if (!error.message.includes("unsatisfied device settings")) {
          console.error('Błąd podczas uzyskiwania lokalizacji:', error);
        }
        setRegion(defaultRegion); // Ustawiamy domyślny region w przypadku błedu lokalizacji
      }
      setIsLoading(false);
    })();
  }, );

  const goToCurrentLocation = () => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setIsUserLocated(true);
      setIsMagnetometerActive(true);
    })();
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    } else {
      return 'N';
    }
  };

  const getDirectionStyle = (direction) => {
    return direction === 'N' ? styles.northDirection : null;
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
            
            showsCompass={false}
            onRegionChangeComplete={(newRegion) => {
              if (newRegion.latitude.toFixed(4) !== region.latitude.toFixed(4) ||
                  newRegion.longitude.toFixed(4) !== region.longitude.toFixed(4)) {
                setIsUserLocated(false);
                setIsMagnetometerActive(false);
              }
            }}
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
              navigation.navigate('Rate', { selectedDriverId: SelectedDriverID });
              setSelectedDriverId(null);
            } else {
              navigation.navigate('OrderRide');
            }
          }}
        >
          <Text style={styles.orderButtonText}>{isRideOrdered ? "Jestem na miejscu" : "Zamów przejazd"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            if (isUserLocated) {
              setIsMagnetometerActive(!isMagnetometerActive);
            } else {
              goToCurrentLocation();
            }
          }}
        >
         
          <Ionicons
            name={isUserLocated ? "compass" : "locate"}
            size={25}
            color="black"
            style={isUserLocated && isMagnetometerActive ? { transform: [{ rotate: `${heading}deg` }] } : {}}
          />
          {isUserLocated && isMagnetometerActive && (
            <Text style={[styles.headingText, getDirectionStyle(_direction(Math.round(heading)))]}>
                {_direction(Math.round(heading))}
            </Text>
          )}
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
  compassContainer: {
    position: 'absolute',
    right: 10,
    bottom: 150,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  headingText: {
    fontSize: 12,
    color: 'black',
    marginLeft: 3,
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
  headingText: {
    fontSize: 12,
    textAlign: 'center',
  },
  northDirection: {
    color: 'red',
  },
});

export default HomeScreen;
