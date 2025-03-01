import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import icons
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Import Navigations
import TabNavigations from './app/navigations/TabNavigations';
import Colors from './assets/Utils/Colors';

// Import Custom Components
import CustomDrawerContent from './app/components/General/CustomDrawerContent';
import CustomHeaderTitle from './app/components/General/CustomHeaderTitle';

// Import Screens
import LoadingScreen from './app/components/landing/Loading';
import WelcomeScreen from './app/screens/landing/Welcome';
import RegisterScreen from './app/screens/Authentication/Register';
import LoginScreen from './app/screens/Authentication/Login';
import ForgotPassword from './app/screens/Authentication/ForgotPassword';
import Notifications from './app/screens/Secondary/Notifications';
import Profile from './app/screens/Secondary/Profile';
import Benefits from './app/screens/Secondary/Benefits';
import Verification from './app/screens/Secondary/Verification';
import AllCards from './app/screens/Secondary/AllCards';
import ClaimForm from './app/screens/Secondary/ClaimForm';
import Support from './app/screens/Secondary/Support';
import FAQScreen from './app/screens/Secondary/FAQs';
import ContactScreen from './app/screens/Secondary/Contact';
import Settings from './app/screens/Secondary/Settings';
import Terms from './app/screens/Secondary/Terms';
import BlogDetail from './app/screens/Secondary/BlogDetails';
import ContentPage from './app/screens/Secondary/Content';
import PolicyDetails from './app/components/Insurance/PolicyDetails';
import HealthDetail from './app/screens/Secondary/HealthDetail';

const { width: screenWidth } = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator component
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: screenWidth * 0.7,
          padding: 10,
        },
        drawerActiveTintColor: Colors.PRIMARY,
        drawerInactiveTintColor: Colors.SECONDARY,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 18,
        },
        drawerPressColor: Colors.PRIMARY,
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={TabNavigations}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="support-agent" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="user-cog" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-alt" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Content"
        component={ContentPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="file-contract" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  });

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: 'Poppins-Medium' },
          headerTintColor: Colors.SECONDARY,
          headerBackTitleVisible: false,
        }}
      >
        {/* Authentication Flows */}
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        {/* Main App Navigation */}
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />

        {/* Secondary Screens */}
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
            headerTitle: () => <CustomHeaderTitle title="Notifications" />
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerTitle: () => <CustomHeaderTitle title="Profile" />
          }}
        />
        <Stack.Screen
          name="Benefits"
          component={Benefits}
          options={{
            title: 'Benefits',
            headerTitle: () => <CustomHeaderTitle title="Benefits" />
          }}
        />
        <Stack.Screen
          name="verify"
          component={Verification}
          options={{
            title: 'Verification',
            headerTitle: () => <CustomHeaderTitle title="Verification" />
          }}
        />
        <Stack.Screen
          name="allcards"
          component={AllCards}
          options={{
            title: 'Cards',
            headerTitle: () => <CustomHeaderTitle title="Cards" />
          }}
        />
        <Stack.Screen
          name="ClaimForm"
          component={ClaimForm}
          options={{
            title: 'Claim Form',
            headerTitle: () => <CustomHeaderTitle title="Claim Form" />
          }}
        />
        <Stack.Screen
          name="FAQS"
          component={FAQScreen}
          options={{
            title: 'FAQ',
            headerTitle: () => <CustomHeaderTitle title="FAQ" />
          }}
        />

        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            title: 'Contact',
            headerTitle: () => <CustomHeaderTitle title="Contact" />
          }}
        />

        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{
            title: 'Blog Details',
            headerTitle: () => <CustomHeaderTitle title="Blog Details" />
          }}
        />

        <Stack.Screen
          name="PolicyDetails"
          component={PolicyDetails}
          options={{
            title: 'Policy Details',
            headerTitle: () => <CustomHeaderTitle title="Policy Details" />
          }}
        />

        <Stack.Screen
          name="HealthDetail"
          component={HealthDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});