import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const imageSize = 267;

export default function LoadingAppScreen() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(-imageSize)).current;
  const apiUrl = `${API_BASE_URL}/api/verifytoken`;

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (response.ok) {
        navigation.replace('DrawerNavigationScreen'); // Zastąp stos nawigacji
      } else {
        navigation.replace('Login'); // Zastąp stos nawigacji
      }
    } catch (error) {
      navigation.replace('Login'); // Zastąp stos nawigacji
    }
  };

  useEffect(() => {
    Animated.spring(logoPosition, {
      toValue: 0,
      useNativeDriver: true,
      speed: 1,
      bounciness: 10,
    }).start();

    const timeout = setTimeout(() => {
      checkToken();
    }, 1000); 

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../assets/AlfaDoCelu.png')}
        style={[styles.logo, { transform: [{ translateY: logoPosition }] }]}
      />
    </View>
  );
}
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00101d',
    },
    logo: {
      width: 267,
      height: 267,
    },
  });