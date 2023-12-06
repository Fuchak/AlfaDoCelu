import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const imageSize = 267;

export default function LoadingAppScreen() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(-imageSize)).current;

  useEffect(() => {
    Animated.spring(logoPosition, {
      toValue: 0,
      useNativeDriver: true,
      speed: 1,
      bounciness: 10,
    }).start();

    const timeout = setTimeout(() => {
      navigation.navigate('RegisterChoice');
    }, 1000); // 2 sekundy opóźnienia

    return () => {
      clearTimeout(timeout); // Wyczyść timeout przy odmontowywaniu
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
      backgroundColor: '#00101d', // Czarne tło
    },
    logo: {
      width: 267,
      height: 267,
    },
  });