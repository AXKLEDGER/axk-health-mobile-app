import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width } = Dimensions.get('window');

// Define card configurations
const CARD_CONFIGS = [
  {
    id: 'healthWellness',
    title: 'Health and Wellness',
    image: require('../../../assets/Images/health_wellness.png'),
    icon: 'fitness-outline',
    gradient: ['#4CB8C4', '#3CD3AD'],
    route: 'HealthDetail',
    screenType: 'HealthWellness',
    description: 'Track your health metrics, access wellness programs, and maintain your fitness journey.'
  },
  {
    id: 'healthInsurance',
    title: 'Health Insurance',
    image: require('../../../assets/Images/health_insurance.png'),
    icon: 'shield-checkmark-outline',
    gradient: ['#FF6B6B', '#4ECDC4'],
    route: 'HealthDetail',
    screenType: 'HealthInsurance',
    description: 'Manage your insurance policy, track claims, and access coverage details.'
  }
];

export default function HealthCards() {
  const navigation = useNavigation();

  const handleCardPress = (card) => {
    // Navigate to the detail screen with the specific screen type as a parameter
    navigation.navigate(card.route, {
      screenType: card.screenType,
      title: card.title,
      gradient: card.gradient,
      icon: card.icon,
      description: card.description
    });
  };

  return (
    <View style={styles.container}>
      {CARD_CONFIGS.map((card, index) => (
        <TouchableOpacity
          key={card.id}
          style={[
            styles.cardWrapper,
            index === 0 ? styles.leftCard : styles.rightCard
          ]}
          onPress={() => handleCardPress(card)}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={card.image}
            style={styles.card}
            imageStyle={styles.cardImage}
          >
            {/* Gradient Overlay */}
            <LinearGradient
              colors={card.gradient}
              style={styles.gradientOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Card Content */}
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={card.icon}
                    size={24}
                    color={Colors.WHITE}
                  />
                </View>
                <Text style={styles.cardLabel}>{card.title}</Text>
                <View style={styles.arrowContainer}>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={Colors.WHITE}
                  />
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  cardWrapper: {
    width: width * 0.42, // Reduced width to allow for spacing
  },
  leftCard: {
    marginRight: 8, // Add right margin to the first card
  },
  rightCard: {
    marginLeft: 8, // Add left margin to the second card
  },
  card: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardImage: {
    borderRadius: 20,
    opacity: 0.5,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  cardContent: {
    width: '100%',
    paddingHorizontal: 15, // Slightly reduced horizontal padding
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardLabel: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});