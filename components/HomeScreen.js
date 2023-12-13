import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const defaultRegion = {
  latitude: 50.8660773,
  longitude: 20.6285677,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(defaultRegion);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        if (location) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      } catch (error) {
        console.error(error);
        setErrorMsg('Could not fetch location');
      }
      setIsLoading(false);
    })();

    return () => unsubscribeFocus();
  }, [navigation]);

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
          onPress={() => navigation.navigate('NotificationsScreen')}>
          <Ionicons name="notifications-outline" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate('OrderRideScreen')}
        >
          <Text style={styles.orderButtonText}>Zamów przejazd</Text>
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
});

export default HomeScreen;
