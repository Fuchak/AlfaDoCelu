import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../config';

const WalletScreen = ({navigation}) => {

  const [saldo, setSaldo] = useState(0);
  const [historiaTransakcji, setHistoriaTransakcji] = useState([]);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchWalletData();
    });

    return unsubscribe;
  }, [navigation]);
  
  const fetchWalletData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/user-wallet`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Problem z pobraniem danych portfela');
      }
  
      const data = await response.json();
      setSaldo(data.saldo);
      setHistoriaTransakcji(data.historiaTransakcji);
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  return (
    <View style={styles.container}>
      {/* Header z przyciskiem powrotu i tytułem */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {
          <Ionicons name="arrow-back" size={24} color="white" />
        }
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfel</Text>
      </View>

      {/* Sekcja z saldem portfela */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTextTitle}>Twoje saldo</Text>
        <Text style={styles.balanceText}>{saldo} ZŁ</Text>
      </View>

      {/* Przycisk doładowania konta */}
      <TouchableOpacity style={styles.reloadButton} onPress={() => navigation.navigate('ReloadBlik')}>
        <Text style={styles.reloadButtonText}>DOŁADUJ KONTO</Text>
      </TouchableOpacity>
      
      {/* Metody płatności */}
      <View style={styles.paymentMethodsSection}>
        <Text style={styles.paymentMethodsTitle}>Metody płatności</Text>
        <Text style={styles.paymentMethod}>• BLIK</Text>
        <Text style={styles.paymentMethod}>• Chwilowo nie obsługujemy płatności kartą</Text>
      </View>

      {/* Historia wpłat */}
      <ScrollView style={styles.historySection}>
        <Text style={styles.historyTitle}>Historia wpłat</Text>
        {historiaTransakcji.map(payment => (
          <View key={payment.idTransakcji} style={styles.paymentItem}>
            <Text style={styles.paymentDate}>{formatDate(payment.dataWplaty)}</Text>
            <Text style={styles.paymentAmount}>{payment.kwotaWplaty} zł {payment.typWplaty}</Text>
            <Text style={styles.paymentDescription}>{payment.rodzaj}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // biały
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#292929', // kolor czarny dla nagłówka
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  balanceSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // jasnoszary
  },
  balanceTextTitle: {
    fontSize: 16,
    color: '#929292', // szary
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentMethodsSection: {
    padding: 20,
  },
  paymentMethodsTitle: {
    fontSize: 16,
    color: '#929292', // szary
  },
  paymentMethod: {
    fontSize: 18,
  },
  historySection: {
    flex: 1,
    padding: 20,
  },
  historyTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#929292', // szary
  },
   paymentItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f7f7f7', // bardzo jasny szary
    borderRadius: 5,
  },
  paymentDate: {
    fontSize: 14,
    color: '#6e6e6e', // ciemnoszary
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6e6e6e', // ciemnoszary
    marginTop: 5,
  },
  reloadButton: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: 'orange', // pomarańczowy
    borderRadius: 5,
    alignItems: 'center',
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen;