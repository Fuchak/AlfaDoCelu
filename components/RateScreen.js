import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RateScreen = ({navigation}) => {
  const [rating, setRating] = useState(0); // Użyjemy stanu do przechowywania oceny
    const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.star}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={30}
            color={i <= rating ? '#f1a11b' : '#ccc'} // Kolor wypełnionych i pustych gwiazdek
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {
          <Ionicons name="arrow-back" size={24} color="white" />
        }
        </TouchableOpacity>
        <Text style={styles.headerText}>Oceń przejazd</Text>
      </View>
      <TextInput
        style={styles.text}
        placeholder="Oceń swój przejazd w skali od 0 do 5:"
        placeholderTextColor="#000"
      />
      <View style={styles.starsContainer}>{renderStars()}</View>
      <TextInput
        style={styles.inputPrzejazdu}
        placeholder="Opisz swój przejazd"
        placeholderTextColor="#000"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Wyślij opinię</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f1f1f1', // tło całego kontenera
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    padding: 16,
    marginRight: 16, // dodaj trochę miejsca z prawej strony, jeśli potrzebujesz
  },
  backButtonText: {
    color: '#ffffff', // kolor tekstu przycisku
    fontSize: 20, // możesz dostosować rozmiar tekstu
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#292929', // kolor czarny dla nagłówka
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: 'white', // kolor tekstu nagłówka
    fontSize: 20,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputPrzejazdu: {
    backgroundColor: '#ffffff', // białe tło dla inputów
    borderColor: '#000000', // kolor obramowania inputów
    borderWidth: 1,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    fontSize: 16,
    height: 230,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f1a11b', // kolor tła przycisku
    padding: 16,
    margin: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // kolor tekstu przycisku
    fontSize: 16,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  star: {
    padding: 6,
  },
});

export default RateScreen;