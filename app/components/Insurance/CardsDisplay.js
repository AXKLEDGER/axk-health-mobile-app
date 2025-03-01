import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../assets/Utils/Colors';
import Logo from '../../../assets/Images/axklogo.png';
import UIImg from '../../../assets/Images/UI1.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CardComponent = ({
  name,
  memberId,
  employer,
  expiration,
  brand,
  backgroundColor
}) => {
  // Add console logging to debug data issues
  console.log('Card Props:', { name, memberId, employer, expiration, brand, backgroundColor });

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundColor]}
      style={styles.cardContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={UIImg}
        style={styles.backgroundImage}
        blurRadius={2}
      />

      <View style={styles.cardContent}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardLabel}>Member Name</Text>
            <Text style={styles.cardValue}>{name || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Member ID</Text>
            <Text style={styles.cardValue}>{memberId || 'N/A'}</Text>
          </View>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.detailLabel}>Employer</Text>
            <Text style={styles.detailValue}>{employer || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Expiration</Text>
            <Text style={styles.detailValue}>{expiration || 'N/A'}</Text>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <Image
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>{brand || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default function CardsDisplay() {
  const [activeCards, setActiveCards] = useState([
    {
      name: 'Jane Smith',
      memberId: '03D54H23',
      employer: 'AFRIKABAL',
      expiration: '11/2025',
      brand: 'ProActiv',
      backgroundColor: '#FD8A8A'
    },
    {
      name: 'John Doe',
      memberId: '04D54H24',
      employer: 'AFRIKABAL',
      expiration: '12/2026',
      brand: 'Insurance',
      backgroundColor: Colors.PRIMARY
    }
  ]);

  // Debug log to verify data
  useEffect(() => {
    console.log('Active Cards:', activeCards);
  }, [activeCards]);

  return (
    <View style={styles.container}>
      {/* Active Cards Section */}
      <Text style={styles.sectionTitle}>Active Cards</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScrollView}
      >
        {activeCards && activeCards.length > 0 ? (
          activeCards.map((card, index) => (
            <CardComponent
              key={index}
              name={card.name}
              memberId={card.memberId}
              employer={card.employer}
              expiration={card.expiration}
              brand={card.brand}
              backgroundColor={card.backgroundColor}
            />
          ))
        ) : (
          <View style={styles.noCardContainer}>
            <Text style={styles.noCardText}>No active cards available</Text>
          </View>
        )}
      </ScrollView>

      {/* Inactive Cards Section */}
      <Text style={styles.sectionTitle}>Inactive Cards</Text>
      <View style={styles.inactiveCard}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={Colors.SECONDARY}
        />
        <Text style={styles.inactiveText}>
          No inactive cards on this account
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    marginVertical: 15,
    color: Colors.SECONDARY,
    paddingHorizontal: 20,
  },
  cardScrollView: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: screenWidth * 0.85,
    height: 200, // Add explicit height
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
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
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  detailLabel: {
    fontFamily: 'Poppins',
    color: Colors.WHITE,
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 5,
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  logo: {
    width: screenWidth * 0.2,
    height: screenHeight * 0.06,
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
  inactiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD3B6',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inactiveText: {
    fontSize: 16,
    color: Colors.SECONDARY,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
  noCardContainer: {
    width: screenWidth * 0.85,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    marginRight: 15,
  },
  noCardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.SECONDARY,
  },
});