import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

const paymentsHistory = [
  { id: 1, date: '2023-10-01', amount: '150,00 BLIK', description: 'Wpłata od Jan Kowalski' },
  { id: 2, date: '2023-09-22', amount: '75,50 BLIK', description: 'Zwrot za zakupy' },
  { id: 3, date: '2023-09-15', amount: '200,00 BLIK', description: 'Wpłata własna' },
];

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header z przyciskiem powrotu i tytułem */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfel</Text>
      </View>

      {/* Sekcja z saldem portfela */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTextTitle}>Twoje saldo</Text>
        <Text style={styles.balanceText}>0,00 ZŁ</Text>
      </View>

      {/* Przycisk doładowania konta */}
      <TouchableOpacity style={styles.reloadButton} onPress={() => {}}>
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
        {paymentsHistory.map(payment => (
          <View key={payment.id} style={styles.paymentItem}>
            <Text style={styles.paymentDate}>{payment.date}</Text>
            <Text style={styles.paymentAmount}>{payment.amount}</Text>
            <Text style={styles.paymentDescription}>{payment.description}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'orange', // kolor pomarańczowy dla nagłówka
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'orange', // Przykładowy niebieski kolor
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