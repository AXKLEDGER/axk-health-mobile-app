import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/Utils/Colors';

const { width } = Dimensions.get('window');

export default function PolicyCard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Policy</Text>

      <View style={styles.policyCardContainer}>
        <LinearGradient
          colors={[Colors.PRIMARY, '#4ECDC4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.policyCard}
        >
          {/* Policy Header */}
          <View style={styles.policyHeader}>
            <View style={styles.policyInfoContainer}>
              <Text style={styles.policyInfoLabel}>Employer</Text>
              <Text style={styles.policyInfoValue}>AFRIKABAL</Text>
            </View>
            <View style={styles.policyInfoContainer}>
              <Text style={styles.policyInfoLabel}>Member ID</Text>
              <Text style={styles.policyInfoValue}>02D54H23</Text>
            </View>
          </View>

          {/* Additional Policy Details */}
          <View style={styles.policyDetailsContainer}>
            <View style={styles.policyDetailItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={Colors.WHITE}
              />
              <Text style={styles.policyDetailText}>Active</Text>
            </View>
            <View style={styles.policyDetailItem}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Colors.WHITE}
              />
              <Text style={styles.policyDetailText}>Valid Until Dec 2024</Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Benefits')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>View Benefits</Text>
            <Ionicons
              name="eye-outline"
              size={20}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    marginBottom: 15,
    color: Colors.SECONDARY,
  },
  policyCardContainer: {
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
  policyCard: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  policyInfoContainer: {
    alignItems: 'center',
  },
  policyInfoLabel: {
    color: Colors.WHITE,
    fontFamily: 'Poppins',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
  },
  policyInfoValue: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  policyDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  policyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyDetailText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
  },
  actionButtonText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginRight: 10,
  },
});