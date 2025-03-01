import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function Claims() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.claimCard}>
        <View style={styles.claimHeader}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={Colors.PRIMARY}
          />
          <Text style={styles.sectionTitle}>My Claims</Text>
        </View>

        <Text style={styles.claimDescription}>
          Submit claims for treatments outside our cover area
        </Text>
        <Text style={styles.processingTime}>
          50% to full refund | Processing time: Up to 14 days
        </Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('ClaimForm')}
        >
          <Text style={styles.submitButtonText}>Submit Claim</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  claimCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  claimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginLeft: 10,
  },
  claimDescription: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.SECONDARY,
    marginBottom: 5,
  },
  processingTime: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: Colors.SECONDARY,
    opacity: 0.7,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginRight: 10,
  },
});