import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/Utils/Colors';
import Logo from '../../../assets/Images/axklogo.png';
import UIImg from '../../../assets/Images/UI1.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Cards() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>My Cards</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('allcards')}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllButtonText}>See All</Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      {/* Card Container with Perspective */}
      <View style={styles.cardContainer}>
        {/* Back Card (Partially Visible) */}
        <LinearGradient
          colors={['#FD8A8A', '#FF6B6B']}
          style={[styles.card, styles.backCard]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Front Card */}
        <LinearGradient
          colors={[Colors.PRIMARY, '#4ECDC4']}
          style={[styles.card, styles.frontCard]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Background Image */}
          <Image
            source={UIImg}
            style={styles.backgroundImage}
            blurRadius={2}
          />

          {/* Card Content */}
          <View style={styles.cardContent}>
            {/* Header Section */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardLabel}>Member Name</Text>
                <Text style={styles.cardValue}>John Doe</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Member ID</Text>
                <Text style={styles.cardValue}>02D54H23</Text>
              </View>
            </View>

            {/* Details Section */}
            <View style={styles.cardDetailsSection}>
              <View>
                <Text style={styles.cardDetailsLabel}>Employer</Text>
                <Text style={styles.cardDetailsValue}>AFRIKABAL</Text>
              </View>
              <View>
                <Text style={styles.cardDetailsLabel}>Expiration</Text>
                <Text style={styles.cardDetailsValue}>12/2024</Text>
              </View>
            </View>

            {/* Footer Section */}
            <View style={styles.cardFooter}>
              <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.brandBadge}>
                <Text style={styles.brandBadgeText}>Insurance</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllButtonText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
    marginRight: 5,
  },
  cardContainer: {
    position: 'relative',
    height: screenHeight * 0.3,
  },
  card: {
    position: 'absolute',
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  backCard: {
    top: 20,
    height: '85%',
    width: '95%',
    alignSelf: 'center',
    zIndex: 1,
  },
  frontCard: {
    top: 0,
    height: '90%',
    zIndex: 2,
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth * 1.2,
    height: screenHeight * 0.4,
    top: 100,
    right: 0,
    opacity: 0.1,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontFamily: 'Poppins',
    color: Colors.WHITE,
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 5,
  },
  cardValue: {
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
    fontSize: 16,
  },
  cardDetailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardDetailsLabel: {
    fontFamily: 'Poppins',
    color: Colors.WHITE,
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 5,
  },
  cardDetailsValue: {
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.08,
  },
  brandBadge: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  brandBadgeText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
    fontSize: 12,
  },
});