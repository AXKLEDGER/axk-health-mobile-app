import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../../assets/Utils/Colors';
import Profileavatar from '../../../assets/Images/avatar4.jpg';
import Header from '../../components/General/Header';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileTab />;
      case 'Preferences':
        return (
          <PreferencesTab
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            pushNotifications={pushNotifications}
            setPushNotifications={setPushNotifications}
          />
        );
      case 'Security':
        return (
          <SecurityTab
            twoFactorAuth={twoFactorAuth}
            setTwoFactorAuth={setTwoFactorAuth}
          />
        );
      case 'Subscription':
        return (
          <PaymentTab
            autoRenewal={autoRenewal}
            setAutoRenewal={setAutoRenewal}
          />
        );
      default:
        return <ProfileTab />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />

      <SafeAreaView style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>

      <View style={styles.tabContainer}>
        {['Profile', 'Preferences', 'Security', 'Subscription'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

function ProfileTab() {
  return (
    <View>
      <View style={styles.profileImageContainer}>
        <Image source={Profileavatar} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraButton}>
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={26}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value="Simeon Azeh"
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value="Kongnyuy"
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value="Simeon Azeh"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value="simeonazeh6@gmail.com"
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value="+250798654693"
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value="123 Main St"
      />
      <TextInput
        placeholder="State"
        style={styles.input}
        value="Kigali"
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        value="Rwanda"
      />
      <TextInput
        placeholder="Member ID"
        style={[styles.input, styles.memberIdInput]}
        multiline
        value="AXK-12SADBN4"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

function PreferencesTab({
  emailNotifications,
  setEmailNotifications,
  pushNotifications,
  setPushNotifications
}) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Email Notifications</Text>
        <Switch
          value={emailNotifications}
          onValueChange={setEmailNotifications}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor={emailNotifications ? '#9835ff' : Colors.GRAY}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Push Notifications</Text>
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor={pushNotifications ? '#9835ff' : Colors.GRAY}
        />
      </View>
      <Text style={styles.sectionTitle}>Notify me when:</Text>
      <View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Claim Status Updates</Text>
          <Switch
            value={true}
            trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
            thumbColor="#9835ff"
          />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Policy Renewal Reminders</Text>
          <Switch
            value={false}
            trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
            thumbColor={Colors.GRAY}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <Picker style={styles.input}>
        <Picker.Item label="Light" value="light" />
        <Picker.Item label="Dark" value="dark" />
      </Picker>
      <Text style={styles.sectionTitle}>Language</Text>
      <Picker style={styles.input}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
      </Picker>
      <Text style={styles.sectionTitle}>Time Zone</Text>
      <Picker style={styles.input}>
        <Picker.Item label="PST" value="pst" />
        <Picker.Item label="EST" value="est" />
      </Picker>
    </View>
  );
}

function SecurityTab({ twoFactorAuth, setTwoFactorAuth }) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Two-Factor Authentication</Text>
        <Switch
          value={twoFactorAuth}
          onValueChange={setTwoFactorAuth}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor={twoFactorAuth ? '#9835ff' : Colors.GRAY}
        />
      </View>
      <Text style={styles.sectionTitle}>Privacy Settings</Text>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Make my account private</Text>
        <Switch
          value={true}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor="#9835ff"
        />
      </View>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Notify me of attempted logins</Text>
        <Switch
          value={false}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor={Colors.GRAY}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PaymentTab({ autoRenewal, setAutoRenewal }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.sectionTitle}>Your Plan</Text>
      <View style={styles.planCardContainer}>
        <PlanCard
          name="Free"
          price="$260/Trim"
          description="Basic access"
          active
        />
        <PlanCard
          name="Standard"
          price="$600/Trim"
          description="Standard features"
        />
        <PlanCard
          name="Family"
          price="$1500/Trim"
          description="Family plan, covers up to 6 members"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Auto Renewal</Text>
        <Switch
          value={autoRenewal}
          onValueChange={setAutoRenewal}
          trackColor={{ false: Colors.GRAY, true: '#9835ff' }}
          thumbColor={Colors.GRAY}
        />
      </View>
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      <PaymentMethodCard method="Credit Card" icon="credit-card" />
      <PaymentMethodCard method="PayPal" icon="paypal" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PaymentPage')}
      >
        <Text style={styles.buttonText}>Billing Information</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Billing History</Text>
      <View style={styles.billingHistory}>
        <View style={styles.billingRow}>
          <Text style={styles.billingHeader}>Date</Text>
          <Text style={styles.billingHeader}>Reason</Text>
          <Text style={styles.billingHeader}>Amount</Text>
          <Text style={styles.billingHeader}>Invoice</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={styles.billingValue}>01/08/2024</Text>
          <Text style={styles.billingValue}>2ND Trim</Text>
          <Text style={styles.billingValue}>$699</Text>
          <TouchableOpacity>
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PlanCard({ name, price, description, active }) {
  return (
    <TouchableOpacity style={[styles.planCard, active && styles.activePlan]}>
      <Text style={[styles.planName, active && styles.activePlanText]}>
        {name}
      </Text>
      <Text style={[styles.planPrice, active && styles.activePlanText]}>
        {price}
      </Text>
      <Text style={[styles.planDescription, active && styles.activePlanText]}>
        {description}
      </Text>
      {active ? (
        <TouchableOpacity style={[styles.planButton, styles.cancelButton]}>
          <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.planButton, styles.selectButton]}>
          <Text style={styles.selectButtonText}>Select Plan</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

function PaymentMethodCard({ method, icon }) {
  return (
    <View style={styles.paymentMethodCard}>
      <FontAwesome name={icon} size={24} color={Colors.SECONDARY} />
      <Text style={styles.paymentMethodText}>{method}</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerSafeArea: {
    backgroundColor: Colors.WHITE,
    zIndex: 2,
    elevation: 3,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTabItem: {
    backgroundColor: Colors.PRIMARY,
  },
  tabText: {
    fontSize: screenWidth * 0.035,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  activeTabText: {
    color: Colors.WHITE,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: screenWidth * 0.36,
    backgroundColor: 'white',
    borderRadius: 50,
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    width: '100%',
    fontSize: screenWidth * 0.035,
    paddingHorizontal: 10,
  },
  memberIdInput: {
    height: screenHeight * 0.08,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    marginTop: screenHeight * 0.02,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  rowText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.SECONDARY,
    marginTop: 20,
    marginBottom: 10,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  notificationText: {
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
  },
  buttonContainer: {
    marginTop: 20,
  },
  planCardContainer: {
    marginVertical: 20,
  },
  planCard: {
    padding: 20,
    backgroundColor: '#F9FBFE',
    borderRadius: 10,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    marginBottom: 10,
  },
  activePlan: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  planName: {
    fontSize: screenWidth * 0.04,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  planPrice: {
    fontSize: screenWidth * 0.03,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  planDescription: {
    fontSize: screenWidth * 0.03,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  activePlanText: {
    color: Colors.WHITE,
  },
  planButton: {
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  cancelButtonText: {
    color: Colors.PRIMARY,
  },
  selectButton: {
    backgroundColor: Colors.PRIMARY,
  },
  selectButtonText: {
    color: Colors.WHITE,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  paymentMethodText: {
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  billingHistory: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  billingHeader: {
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  billingValue: {
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
  },
  downloadText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
  },
};
