import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions
} from 'react-native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../assets/Utils/Colors';
import Cards from '../../components/Insurance/Cards';

const { width: screenWidth } = Dimensions.get('window');

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Sample user profile data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    address: '123 Main St, City, Country',
    dateOfBirth: '01/01/1980',
    gender: 'Male',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '75 kg',
    allergies: 'None',
    chronicConditions: 'None',
    emergencyContact: 'Jane Doe (+123 456 7891)',
    policyNumber: 'AXK-12345678',
    subscriptionType: 'Premium Health Plan',
    subscriptionStatus: 'Active',
    startDate: '01/01/2023',
    renewalDate: '01/01/2024',
    coverageLimit: '$500,000',
    outpatientCoverage: 'Yes (80% covered)',
    inpatientCoverage: 'Yes (100% covered)',
    medicationCoverage: 'Yes (70% covered)'
  });

  // Function to handle the change of input fields
  const handleChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (editing) {
      // Save changes logic would go here
      // For now, just toggle the edit mode
    }
    setEditing(!editing);
  };

  const renderInputField = (label, key, icon, editable = true, keyboardType = 'default') => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Feather name={icon} size={18} color={Colors.PRIMARY} style={styles.fieldIcon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          !editing && styles.readOnlyInput,
          !editable && styles.disabledInput
        ]}
        value={profileData[key]}
        editable={editing && editable}
        onChangeText={(text) => handleChange(key, text)}
        keyboardType={keyboardType}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </View>
  );

  const renderInfoItem = (label, value, icon) => (
    <View style={styles.infoItem}>
      <Feather name={icon} size={18} color={Colors.PRIMARY} style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.sectionContainer}>
      {renderInputField('Full Name', 'name', 'user')}
      {renderInputField('Email', 'email', 'mail', true, 'email-address')}
      {renderInputField('Phone', 'phone', 'phone', true, 'phone-pad')}
      {renderInputField('Address', 'address', 'map-pin')}
      {renderInputField('Date of Birth', 'dateOfBirth', 'calendar')}
      {renderInputField('Gender', 'gender', 'user')}
    </View>
  );

  const renderMedicalInfo = () => (
    <View style={styles.sectionContainer}>
      {renderInputField('Blood Type', 'bloodType', 'droplet')}
      {renderInputField('Height', 'height', 'activity')}
      {renderInputField('Weight', 'weight', 'activity')}
      {renderInputField('Allergies', 'allergies', 'alert-circle')}
      {renderInputField('Chronic Conditions', 'chronicConditions', 'heart')}
      {renderInputField('Emergency Contact', 'emergencyContact', 'phone-call')}
    </View>
  );

  const renderInsuranceInfo = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.insuranceHeader}>
        <View style={styles.policyNumberContainer}>
          <Text style={styles.policyNumberLabel}>Policy Number</Text>
          <Text style={styles.policyNumberValue}>{profileData.policyNumber}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{profileData.subscriptionStatus}</Text>
        </View>
      </View>

      <View style={styles.planInfoCard}>
        <Text style={styles.planTitle}>{profileData.subscriptionType}</Text>
        <View style={styles.planDetails}>
          {renderInfoItem('Start Date', profileData.startDate, 'calendar')}
          {renderInfoItem('Renewal Date', profileData.renewalDate, 'refresh-cw')}
          {renderInfoItem('Coverage Limit', profileData.coverageLimit, 'dollar-sign')}
        </View>
      </View>

      <Text style={styles.coverageTitle}>Coverage Details</Text>
      <View style={styles.coverageContainer}>
        {renderInfoItem('Outpatient Care', profileData.outpatientCoverage, 'user-check')}
        {renderInfoItem('Inpatient Care', profileData.inpatientCoverage, 'home')}
        {renderInfoItem('Medications', profileData.medicationCoverage, 'package')}
      </View>

      <Text style={styles.cardsTitle}>Insurance Cards</Text>
      <Cards />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />

      <LinearGradient
        colors={[Colors.PRIMARY, '#4ECDC4']}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Feather name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'personal' && styles.activeTabButton]}
          onPress={() => setActiveTab('personal')}
        >
          <Feather name="user" size={20} color={activeTab === 'personal' ? Colors.PRIMARY : '#666'} />
          <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'medical' && styles.activeTabButton]}
          onPress={() => setActiveTab('medical')}
        >
          <Feather name="activity" size={20} color={activeTab === 'medical' ? Colors.PRIMARY : '#666'} />
          <Text style={[styles.tabText, activeTab === 'medical' && styles.activeTabText]}>Medical</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'insurance' && styles.activeTabButton]}
          onPress={() => setActiveTab('insurance')}
        >
          <Feather name="shield" size={20} color={activeTab === 'insurance' ? Colors.PRIMARY : '#666'} />
          <Text style={[styles.tabText, activeTab === 'insurance' && styles.activeTabText]}>Insurance</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'medical' && renderMedicalInfo()}
        {activeTab === 'insurance' && renderInsuranceInfo()}
      </ScrollView>

      {(activeTab === 'personal' || activeTab === 'medical') && (
        <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
          <Feather name={editing ? "check" : "edit-2"} size={20} color="#fff" style={styles.editIcon} />
          <Text style={styles.editButtonText}>{editing ? 'Save Changes' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.PRIMARY,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: -25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: Colors.PRIMARY + '15',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  activeTabText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 100, // Space for the button
  },
  fieldContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldIcon: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
  },
  readOnlyInput: {
    backgroundColor: '#f9f9f9',
    borderColor: '#eaeaea',
  },
  disabledInput: {
    backgroundColor: '#f1f1f1',
    borderColor: '#e0e0e0',
    color: '#888',
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  editIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  // Insurance section specific styles
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  policyNumberContainer: {
    flex: 1,
  },
  policyNumberLabel: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: '#666',
  },
  policyNumberValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  planInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
    marginBottom: 15,
  },
  planDetails: {
    gap: 10,
  },
  coverageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  coverageContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
});