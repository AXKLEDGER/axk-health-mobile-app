import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PolicyDetails({ navigation }) {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* Custom Header */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.SECONDARY}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Policy Details</Text>
      </View> */}

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Policy Details Content */}
        <View style={styles.container}>
          <LinearGradient
            colors={[Colors.WHITE, '#F7F7F7']}
            style={styles.policyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Policy Summary Section */}
            <View style={styles.policySummaryContainer}>
              <View style={styles.policyInfoRow}>
                <View style={styles.policyInfoContainer}>
                  <Text style={styles.cardTitle}>Employer</Text>
                  <Text style={styles.cardSubtitle}>AFRIKABAL</Text>
                </View>
                <View style={styles.policyInfoContainer}>
                  <Text style={styles.cardTitle}>Member ID</Text>
                  <Text style={styles.cardSubtitle}>02D54H23</Text>
                </View>
              </View>
            </View>

            {/* Policy Dates Section */}
            <View style={styles.policySectionDivider} />
            <View style={styles.policySummaryContainer}>
              <View style={styles.policyInfoRow}>
                <View style={styles.policyInfoContainer}>
                  <Text style={styles.cardTitle}>Policy Start Date</Text>
                  <Text style={styles.cardSubtitle}>29-07-2024</Text>
                </View>
                <View style={styles.policyInfoContainer}>
                  <Text style={styles.cardTitle}>Policy End Date</Text>
                  <Text style={styles.cardSubtitle}>29-12-2024</Text>
                </View>
              </View>
            </View>

            {/* Policy Status Section */}
            <View style={styles.policySectionDivider} />
            <View style={styles.policyStatusContainer}>
              <View style={styles.policyStatusItem}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color={Colors.PRIMARY}
                />
                <View style={styles.policyStatusTextContainer}>
                  <Text style={styles.policyStatusTitle}>Policy Status</Text>
                  <Text style={styles.policyStatusSubtitle}>Active</Text>
                </View>
              </View>
              <View style={styles.policyStatusItem}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={Colors.PRIMARY}
                />
                <View style={styles.policyStatusTextContainer}>
                  <Text style={styles.policyStatusTitle}>Coverage</Text>
                  <Text style={styles.policyStatusSubtitle}>Full</Text>
                </View>
              </View>
            </View>

            {/* Additional Policy Details */}
            <View style={styles.policySectionDivider} />
            <View style={styles.additionalDetailsContainer}>
              <View style={styles.additionalDetailItem}>
                <Text style={styles.additionalDetailLabel}>Total Coverage</Text>
                <Text style={styles.additionalDetailValue}>$50,000</Text>
              </View>
              <View style={styles.additionalDetailItem}>
                <Text style={styles.additionalDetailLabel}>Premium</Text>
                <Text style={styles.additionalDetailValue}>$250/month</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  policyCard: {
    borderRadius: 15,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  policySummaryContainer: {
    marginBottom: 10,
  },
  policyInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  policyInfoContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.7,
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  policySectionDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  policyStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  policyStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  policyStatusTextContainer: {
    marginLeft: 10,
  },
  policyStatusTitle: {
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    fontSize: 12,
    opacity: 0.7,
  },
  policyStatusSubtitle: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
    fontSize: 14,
  },
  additionalDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  additionalDetailItem: {
    alignItems: 'center',
  },
  additionalDetailLabel: {
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.7,
  },
  additionalDetailValue: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
    fontSize: 16,
  },
});