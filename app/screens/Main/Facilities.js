import React, { useState } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/General/Header';
import Colors from '../../../assets/Utils/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Facilities = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pharmacies', title: 'Pharmacies' },
    { key: 'hospitals', title: 'Hospitals' },
    { key: 'clinics', title: 'Clinics' },
    { key: 'labs', title: 'Labs' },
    { key: 'specialists', title: 'Specialists' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // Get icon name and type based on category
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'pharmacy':
        return { name: 'pills', type: 'fa5' };
      case 'hospital':
        return { name: 'hospital', type: 'fa5' };
      case 'clinic':
        return { name: 'stethoscope', type: 'fa5' };
      case 'lab':
        return { name: 'flask', type: 'fa5' };
      case 'cardiologist':
        return { name: 'heartbeat', type: 'fa5' };
      case 'dermatologist':
        return { name: 'user-md', type: 'fa5' };
      default:
        return { name: 'medkit', type: 'fa5' };
    }
  };

  const FacilityCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedFacility(item);
        setModalVisible(true);
      }}
      style={styles.card}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[Colors.PRIMARY, '#4ECDC4']}
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FontAwesome5
          name={getCategoryIcon(item.category).name}
          size={26}
          color={Colors.WHITE}
          solid
        />
      </LinearGradient>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color={Colors.SECONDARY} />
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={14} color={Colors.DARK_GRAY} />
          <Text style={styles.cardHours}>{item.hours}</Text>
        </View>
        <View style={styles.cardTagContainer}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color={Colors.LIGHT_GRAY} />
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = (data) => (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item, index) => (
        <FacilityCard key={index} item={item} />
      ))}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.findLocationButton}>
          <View style={styles.findLocationInner}>
            <Ionicons name="location" size={18} color={Colors.SECONDARY} />
            <Text style={styles.findLocationText}>Find Closest to Location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Sample data with updated formatting
  const PharmaciesRoute = () => renderTabContent([
    {
      title: 'Pharmacy A',
      image: 'https://via.placeholder.com/100',
      category: 'Pharmacy',
      location: 'Downtown, Main Street',
      hours: '8:00 AM - 8:00 PM',
      services: ['Prescription refill', 'OTC meds', 'Health advice'],
      rating: 4.5,
      distance: '0.8 miles'
    },
    {
      title: 'Pharmacy B',
      image: 'https://via.placeholder.com/100',
      category: 'Pharmacy',
      location: 'East Side, Elm Street',
      hours: '9:00 AM - 10:00 PM',
      services: ['Prescription refill', 'Home delivery', 'Vaccinations'],
      rating: 4.2,
      distance: '1.2 miles'
    },
  ]);

  const HospitalsRoute = () => renderTabContent([
    {
      title: 'Hospital A',
      image: 'https://via.placeholder.com/100',
      category: 'Hospital',
      location: 'West End, Pine Avenue',
      hours: '24/7',
      services: ['Emergency care', 'Surgery', 'Pediatrics'],
      acceptance: 'Inpatients',
      rating: 4.7,
      distance: '2.3 miles'
    },
    {
      title: 'Hospital B',
      image: 'https://via.placeholder.com/100',
      category: 'Hospital',
      location: 'North City, Oak Street',
      hours: '8:00 AM - 5:00 PM',
      services: ['Check-ups', 'Emergency care'],
      acceptance: 'Both',
      rating: 4.0,
      distance: '3.1 miles'
    },
  ]);

  const ClinicsRoute = () => renderTabContent([
    {
      title: 'Clinic A',
      image: 'https://via.placeholder.com/100',
      category: 'Clinic',
      location: 'South Park, Maple Avenue',
      hours: '9:00 AM - 6:00 PM',
      services: ['General checkups', 'Lab tests', 'Consultations'],
      rating: 4.3,
      distance: '0.5 miles'
    },
    {
      title: 'Clinic B',
      image: 'https://via.placeholder.com/100',
      category: 'Clinic',
      location: 'East Bay, Cedar Street',
      hours: '8:00 AM - 4:00 PM',
      services: ['Vaccinations', 'Check-ups', 'Lab tests'],
      rating: 4.1,
      distance: '1.7 miles'
    },
  ]);

  // Lab data
  const LabsRoute = () => renderTabContent([
    {
      title: 'Medical Lab A',
      image: 'https://via.placeholder.com/100',
      category: 'Lab',
      location: 'Central District, Lab Street',
      hours: '7:00 AM - 7:00 PM',
      services: ['Blood tests', 'Urinalysis', 'COVID testing', 'Pathology'],
      rating: 4.6,
      distance: '1.5 miles'
    },
    {
      title: 'Advanced Diagnostics',
      image: 'https://via.placeholder.com/100',
      category: 'Lab',
      location: 'Medical Plaza, Suite 203',
      hours: '8:00 AM - 6:00 PM',
      services: ['DNA testing', 'Full body scans', 'Allergy testing'],
      rating: 4.4,
      distance: '2.8 miles'
    },
  ]);

  // Specialists data
  const SpecialistsRoute = () => renderTabContent([
    {
      title: 'Dr. Johnson',
      image: 'https://via.placeholder.com/100',
      category: 'Cardiologist',
      location: 'Medical Tower, Floor 5',
      hours: '9:00 AM - 5:00 PM (Mon-Thu)',
      services: ['Heart checkups', 'ECG', 'Cardiac consultation'],
      rating: 4.8,
      distance: '3.2 miles'
    },
    {
      title: 'Dr. Williams',
      image: 'https://via.placeholder.com/100',
      category: 'Dermatologist',
      location: 'Wellness Center, Room 102',
      hours: '10:00 AM - 6:00 PM (Tue-Fri)',
      services: ['Skin exams', 'Mole removal', 'Acne treatment'],
      rating: 4.9,
      distance: '1.9 miles'
    },
  ]);

  const renderScene = SceneMap({
    pharmacies: PharmaciesRoute,
    hospitals: HospitalsRoute,
    clinics: ClinicsRoute,
    labs: LabsRoute,
    specialists: SpecialistsRoute,
  });

  const renderService = (service) => (
    <View style={styles.serviceItem} key={service}>
      <Ionicons name="checkmark-circle" size={16} color={Colors.PRIMARY} />
      <Text style={styles.serviceItemText}>{service}</Text>
    </View>
  );

  const FacilityModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <LinearGradient
              colors={[Colors.PRIMARY, '#4ECDC4']}
              style={styles.modalIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <FontAwesome5
                name={getCategoryIcon(selectedFacility?.category).name}
                size={30}
                color={Colors.WHITE}
                solid
              />
            </LinearGradient>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{selectedFacility?.title}</Text>
              <Text style={styles.modalCategory}>{selectedFacility?.category}</Text>
              {selectedFacility?.rating && (
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(selectedFacility.rating) ? "star" : star <= selectedFacility.rating ? "star-half" : "star-outline"}
                      size={16}
                      color="#FFD700"
                      style={{ marginRight: 2 }}
                    />
                  ))}
                  <Text style={styles.ratingText}>{selectedFacility.rating}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color={Colors.DARK_GRAY} />
              <Text style={styles.detailText}>{selectedFacility?.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color={Colors.DARK_GRAY} />
              <Text style={styles.detailText}>{selectedFacility?.hours}</Text>
            </View>
            {selectedFacility?.distance && (
              <View style={styles.detailRow}>
                <Ionicons name="navigate-outline" size={20} color={Colors.DARK_GRAY} />
                <Text style={styles.detailText}>{selectedFacility.distance}</Text>
              </View>
            )}
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.servicesList}>
              {selectedFacility?.services.map((service) => renderService(service))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.mapButton]}
              onPress={() => alert('Showing on Map')}
            >
              <Ionicons name="map-outline" size={18} color={Colors.WHITE} />
              <Text style={styles.modalButtonText}>Show on Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.callButton]}
              onPress={() => alert('Calling Facility')}
            >
              <Ionicons name="call-outline" size={18} color={Colors.WHITE} />
              <Text style={styles.modalButtonText}>Call</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <Text style={styles.screenTitle}>Healthcare Facilities</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor={Colors.PRIMARY}
            inactiveColor={Colors.DARK_GRAY}
            scrollEnabled={true}
            tabStyle={{ width: 'auto', paddingHorizontal: 10 }}
            renderLabel={({ route, focused, color }) => (
              <Text style={[
                styles.tabLabel,
                { color: focused ? Colors.PRIMARY : Colors.DARK_GRAY }
              ]}>
                {route.title}
              </Text>
            )}
          />
        )}
        style={styles.tabView}
      />
      {modalVisible && <FacilityModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  // Tab styles
  tabIndicator: {
    backgroundColor: Colors.PRIMARY,
    height: 3,
    borderRadius: 3,
  },
  tabBar: {
    backgroundColor: Colors.WHITE,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabView: {
    marginBottom: 10,
  },
  tabLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textTransform: 'none',
    textAlign: 'center',
  },
  // Card styles
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    marginLeft: 5,
  },
  cardHours: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.DARK_GRAY,
    marginLeft: 5,
  },
  cardTagContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  categoryTag: {
    backgroundColor: Colors.PRIMARY + '20', // 20% opacity
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  categoryTagText: {
    color: Colors.PRIMARY,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  arrowContainer: {
    padding: 5,
  },
  // Scroll content
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  // Button styles
  buttonGroup: {
    marginVertical: 10,
  },
  viewMoreButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  findLocationButton: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  findLocationInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findLocationText: {
    color: Colors.SECONDARY,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  modalCategory: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.DARK_GRAY,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  detailSection: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  servicesSection: {
    marginBottom: 20,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceItemText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalButton: {
    borderRadius: 10,
    width: '48%',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapButton: {
    backgroundColor: Colors.PRIMARY,
  },
  callButton: {
    backgroundColor: '#4ECDC4',
  },
  modalButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default Facilities;