import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const NotificationsScreen = ({ navigation }) => {
  // przykladowe dane na sztywno zeby bylo widac wyglad, jak bedzie baza czy cos to wykrzykniki albo dzwonki maja byc ustawiane automatycznie w zaleznosci od typu powiadomienia
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
      });

      if (!response.ok) {
        throw new Error('Problem z pobraniem powiadomień');
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  const getIconDetails = (type) => {
    switch (type) {
      case 'ALERT':
        return { name: 'warning', color: 'red' };
      case 'INFO':
        return { name: 'notifications', color: 'orange' };
      default:
        return { name: 'information-circle', color: 'black' };
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Powiadomienia</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Ionicons 
              name={getIconDetails(item.typPowiadomienia).name}
              size={24} 
              color={getIconDetails(item.typPowiadomienia).color} 
            />
            <Text style={styles.dateText}>{formatDate(item.dataCzas)}</Text>
            <Text style={styles.notificationText}>{item.trescPowiadomienia}</Text>
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
  headerTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  notificationItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  notificationText: {
    color: '#595858',
    fontSize: 16,
    marginBottom: 2,
  },
});

export default NotificationsScreen;
