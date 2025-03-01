import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 5) return 'Good night';
  if (currentHour < 12) return 'Good morning';
  if (currentHour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Use default parameter assignment directly in the function declaration
const GreetingCard = ({ name = 'User' }) => {
  const greeting = getTimeBasedGreeting();

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        {greeting},
        <Text style={styles.nameText}> {name}</Text>
      </Text>
    </View>
  );
};

GreetingCard.propTypes = {
  name: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  greetingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth * 0.045,
    color: Colors.SECONDARY,
    fontWeight: '500'
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: screenWidth * 0.05,
    color: Colors.PRIMARY,
    fontWeight: '600'
  }
});

export default GreetingCard;