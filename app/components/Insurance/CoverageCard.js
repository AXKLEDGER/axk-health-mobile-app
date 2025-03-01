import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider'; // Ensure this package is installed

const CoverageCard = ({ type, limit, balance }) => {
  const progress = balance / limit; // Calculate progress based on balance

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{type}</Text>
      <Text style={styles.cardDetails}>Benefit Limit: ${limit}</Text>
      <Text style={styles.cardDetails}>Available Balance: ${balance}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        minimumTrackTintColor="#15868c"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#15868c"
        disabled={true} // Disable interaction
      />
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  slider: {
    height: 40,
    marginVertical: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#15868c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
});

export default CoverageCard;
