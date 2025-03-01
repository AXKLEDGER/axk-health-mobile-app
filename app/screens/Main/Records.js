import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

// Mock Data for prescription and diagnostic records with dates and times
const prescriptionRecords = [
  {
    id: 1,
    title: 'Prescription 1',
    category: 'Antibiotics',
    details: 'Take twice a day after meals.',
    date: '2023-08-14',
    time: '14:30',
    icon: 'medkit-outline'
  },
  // Other prescription records...
  {
    id: 2,
    title: 'Prescription 2',
    category: 'Pain Relief',
    details: 'Use for 3 days only.',
    date: '2023-08-12',
    time: '09:00',
    icon: 'tablet-portrait-outline'
  },
  {
    id: 3,
    title: 'Prescription 3',
    category: 'Vitamins',
    details: 'Take one daily in the morning.',
    date: '2023-09-05',
    time: '07:45',
    icon: 'nutrition-outline'
  },
  {
    id: 4,
    title: 'Prescription 4',
    category: 'Allergy Medication',
    details: 'Take only when symptoms appear.',
    date: '2023-09-10',
    time: '18:00',
    icon: 'medical-outline'
  },
];

const diagnosticRecords = [
  {
    id: 1,
    title: 'Diagnosis 1',
    category: 'X-ray',
    details: 'Fracture detected in the left arm.',
    date: '2023-08-15',
    time: '10:00',
    icon: 'body-outline'
  },
  // Other diagnostic records...
  {
    id: 2,
    title: 'Diagnosis 2',
    category: 'Blood Test',
    details: 'Normal blood sugar levels.',
    date: '2023-08-13',
    time: '08:15',
    icon: 'flask-outline'
  },
  {
    id: 3,
    title: 'Diagnosis 3',
    category: 'MRI Scan',
    details: 'No significant findings.',
    date: '2023-09-03',
    time: '13:45',
    icon: 'cellular-outline'
  },
  {
    id: 4,
    title: 'Diagnosis 4',
    category: 'Ultrasound',
    details: 'Mild liver enlargement detected.',
    date: '2023-09-11',
    time: '11:30',
    icon: 'pulse-outline'
  },
];

// Enhanced Header Component
const Header = ({ title, subtitle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerBackButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="chevron-left" size={24} color={Colors.SECONDARY} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.screenTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.screenSubtitle}>{subtitle}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.headerActionButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="filter" size={20} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

// Expandable Card Component
const RecordCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={styles.cardContainer}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[Colors.PRIMARY, '#4ECDC4']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={item.icon}
              size={24}
              color={Colors.WHITE}
            />
          </View>

          <View style={styles.cardTextContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.cardCategory}>
                <Text style={styles.cardCategoryText}>
                  {item.category}
                </Text>
              </View>
            </View>

            <Text style={styles.cardDateTime}>
              {`${item.date} | ${item.time}`}
            </Text>

            {expanded && (
              <Text style={styles.cardDetails}>
                {item.details}
              </Text>
            )}
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={Colors.WHITE}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Prescription Record Component
const PrescriptionRecords = () => (
  <ScrollView
    contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}
  >
    {prescriptionRecords.map((item) => (
      <RecordCard key={item.id} item={item} />
    ))}
  </ScrollView>
);

// Diagnostic Record Component
const DiagnosticRecords = () => (
  <ScrollView
    contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}
  >
    {diagnosticRecords.map((item) => (
      <RecordCard key={item.id} item={item} />
    ))}
  </ScrollView>
);

export default function Records() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'prescriptions', title: 'Prescriptions' },
    { key: 'diagnostics', title: 'Diagnostics' },
  ]);

  const renderScene = SceneMap({
    prescriptions: PrescriptionRecords,
    diagnostics: DiagnosticRecords,
  });

  // Custom tab bar with refined styling
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor={Colors.PRIMARY}
      inactiveColor={Colors.SECONDARY + '80'}
      pressColor={Colors.PRIMARY_LIGHTER}
      renderLabel={({ route, focused }) => (
        <Text style={[
          styles.tabLabel,
          { color: focused ? Colors.PRIMARY : Colors.SECONDARY + '80' }
        ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.WHITE}
        translucent={Platform.OS === 'android'}
      />

      <Header
        title="Medical Records"
        subtitle="View your prescriptions and diagnostic records"
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerWrapper: {
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerGradient: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBackButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY + '90',
    marginTop: 2,
  },
  headerActionButton: {
    padding: 4,
    marginLeft: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
  },
  tabBar: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: Colors.PRIMARY,
    height: 3,
    borderRadius: 3,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
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
  cardGradient: {
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
    flex: 1,
    marginRight: 10,
  },
  cardCategory: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  cardCategoryText: {
    fontSize: 12,
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
  cardDateTime: {
    fontSize: 12,
    color: Colors.WHITE,
    opacity: 0.8,
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  cardDetails: {
    fontSize: 14,
    color: Colors.WHITE,
    marginTop: 5,
    fontFamily: 'Poppins',
  },
});