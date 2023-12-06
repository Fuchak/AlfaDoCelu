import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            {
              <Text style={styles.backButtonText}>{"<"}</Text> //Możesz tutaj użyć ikony z biblioteki, np. Ionicons */
            }
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity onPress={() => {}} style={styles.settingsButton}>
            {
            <Text style={styles.settingsButtonText}>⚙️</Text> //Możesz tutaj użyć ikony z biblioteki, np. Ionicons 
            }
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('./../assets/avatar.png')} //Awatar użytkownika tutaj 
            style={styles.avatar}
          />
          {
          <><Text style={styles.name}>Imię użytkownika</Text>
          <Text style={styles.phoneNumber}>Numer telefonu</Text>
          <Text style={styles.email}>email@example.com</Text></>
          }
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.logoutButton}>
          { 
          <Text style={styles.logoutButtonText}>Wyloguj się</Text>
          }
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Tło całego ekranu
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#292929', // Tło nagłówka
  },
  backButton: {
    // Styl dla przycisku powrotu
  },
  backButtonText: {
    color: 'white', // Kolor tekstu przycisku powrotu
    fontSize: 16,
  },
  headerTitle: {
    color: 'white', // Kolor tytułu nagłówka
    fontSize: 20,
  },
  settingsButton: {
    // Styl dla przycisku ustawień
  },
  settingsButtonText: {
    color: 'white', // Kolor tekstu przycisku ustawień
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    marginVertical: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'grey',
  },
  email: {
    fontSize: 16,
    color: 'grey',
  },
  logoutButton: {
    backgroundColor: '#f3a31a', // Przycisk wylogowania
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default UserProfileScreen;
