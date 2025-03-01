import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import PolicyDetails from '../../components/Insurance/PolicyDetails';
import CoverageCard from '../../components/Insurance/CoverageCard';
import Colors from '../../../assets/Utils/Colors';

const coverageData = [
  { type: 'Inpatient', limit: 5000, balance: 2500, icon: 'bed-outline' },
  { type: 'Outpatient', limit: 3000, balance: 1500, icon: 'medical-outline' },
  { type: 'Optical', limit: 1000, balance: 500, icon: 'eye-outline' },
  { type: 'Dental', limit: 2000, balance: 1200, icon: 'fitness-outline' },
];

const currencyOptions = [
  { label: 'USD', value: 'usd' },
  { label: 'NGN', value: 'ngn' },
  { label: 'KES', value: 'kes' },
  { label: 'GHS', value: 'ghs' },
  { label: 'ZAR', value: 'zar' },
];

export default function Benefits() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0].value);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Policy Details Section */}
      <View style={styles.policyDetailsContainer}>
        <PolicyDetails />
      </View>

      {/* Currency Selector */}
      <View style={styles.sectionContainer}>
        <View style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Select Currency</Text>
          <Ionicons
            name="wallet-outline"
            size={24}
            color={Colors.PRIMARY}
          />
        </View>
        <Dropdown
          data={currencyOptions}
          labelField="label"
          valueField="value"
          value={selectedCurrency}
          onChange={(item) => {
            setSelectedCurrency(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholder="Select Currency"
          containerStyle={styles.dropdownContainer}
          activeColor={Colors.PRIMARY + '20'}
        />
      </View>

      {/* Coverage Benefits Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.coverageHeader}>
          <Text style={styles.sectionTitle}>Coverage Benefits</Text>
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color={Colors.PRIMARY}
          />
        </View>

        {coverageData.map((item, index) => (
          <CoverageCard
            key={index}
            type={item.type}
            limit={item.limit}
            balance={item.balance}
            icon={item.icon}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  policyDetailsContainer: {
    marginBottom: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  coverageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  dropdown: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dropdownContainer: {
    borderRadius: 10,
  },
  dropdownPlaceholder: {
    color: Colors.SECONDARY,
    opacity: 0.7,
    fontFamily: 'Poppins-Medium',
  },
  dropdownSelectedText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
});