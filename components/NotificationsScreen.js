import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = ({ navigation }) => {
  // przykladowe dane na sztywno zeby bylo widac wyglad, jak bedzie baza czy cos to wykrzykniki albo dzwonki maja byc ustawiane automatycznie w zaleznosci od typu powiadomienia
  const [nofitications, setNofitications] = useState([
    { id: '1', notificationType: '❗', notificationContent: 'Twoja taksówka już na ciebie czeka przy: (adres).' },
    { id: '2', notificationType: '❗', notificationContent: 'Środki zostały pomyślnie wpłacone na Twój wirtualny portfel.'},
    { id: '3', notificationType: '🔔', notificationContent: 'Nowa promocja: minus 1,00 PLN za każdy przejechany kilometr!' },
    { id: '4', notificationType: '❗', notificationContent: 'Odpowiedź na Twoje zgłoszenie (temat).'},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Powiadomienia</Text>
      </View>
      <FlatList
        data={nofitications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nofiticationItem}>
            <Text style={styles.nofiticationText}> {item.notificationType}   {item.notificationContent}</Text>
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
  nofiticationItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  nofiticationText: {
    color: '#595858',
    fontSize: 16,
    marginBottom: 2,
  },
});

export default NotificationsScreen;
