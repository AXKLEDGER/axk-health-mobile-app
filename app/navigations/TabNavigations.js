import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import Insurance from '../screens/Main/Insurance';
import Messages from '../screens/Main/Records';
import Facilities from '../screens/Main/Facilities';


const { width: screenWidth } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const TabLabel = ({ focused, children }) => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
  })
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[styles.tabLabel, { color: focused ? '#16484b' : 'gray', fontWeight: focused ? 'bold' : 'normal' }]}>
  {children}
</Text>

  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: 'Poppins',
    fontSize: screenWidth * 0.025,
  },
});

export default function TabNavigations() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Insurance') {
            iconName = focused ? 'shield' : 'shield';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Facilities') {
            iconName = focused ? 'database' : 'database';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Records') {
            iconName = focused ? 'bookmarks-outline' : 'bookmarks-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'IQlink') {
            iconName = focused ? 'dataset-linked' : 'dataset-linked';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarLabel: ({ focused }) => (
          <TabLabel focused={focused}>
            {route.name}
          </TabLabel>
        ),
        tabBarActiveTintColor: '#16484b', // Active color
        tabBarInactiveTintColor: 'gray', // Inactive color
        tabBarStyle: {
          paddingBottom: 10, // Padding bottom
          paddingTop: 10, // Padding top
          height: 80, // Height of the tab bar
          backgroundColor: '#ffffff', // Background color
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Insurance" component={Insurance} />
      <Tab.Screen name="Records" component={Messages} />
      <Tab.Screen name="Facilities" component={Facilities} />
      

     
    </Tab.Navigator>
  );
}
