import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors'; // Adjust this path as necessary
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CustomDrawerContent = ({ navigation, state }) => {
  // Get the currently active route name from navigation state
  const activeScreen = state?.routes[state.index]?.name || '';

  // Animation value for drawer items
  const [animatedValues] = useState(() => {
    const drawerItems = [
      'Dashboard', 'Profile', 'Terms', 'content', 'Support', 'Settings'
    ];
    return drawerItems.reduce((acc, item) => {
      acc[item] = new Animated.Value(0);
      return acc;
    }, {});
  });

  // StatusBar configuration
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(Colors.PRIMARY);
    }
    StatusBar.setBarStyle('light-content');
  }, []);

  // Run entrance animation when component mounts
  useEffect(() => {
    const animations = Object.keys(animatedValues).map((item, index) => {
      return Animated.timing(animatedValues[item], {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true
      });
    });

    Animated.stagger(50, animations).start();
  }, []);

  // Mock user data - in a real app, this would come from a context/redux store
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: null, // URL to avatar image, null will show placeholder
    role: 'Premium User'
  };

  const handlePress = (screen) => {
    // Animate the pressed item
    Animated.sequence([
      Animated.timing(animatedValues[screen], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animatedValues[screen], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();

    navigation.navigate(screen);
  };

  const customDrawerItems = [
    {
      label: 'Dashboard',
      icon: <Feather name="home" size={24} />,
      screen: 'Dashboard',
      accessibilityLabel: 'Go to Dashboard'
    },
    {
      label: 'Profile',
      icon: <AntDesign name="user" size={24} />,
      screen: 'Profile',
      accessibilityLabel: 'View your profile'
    },
    {
      label: 'Terms & Conditions',
      icon: <MaterialCommunityIcons name="book-plus-multiple-outline" size={24} />,
      screen: 'Terms',
      accessibilityLabel: 'Read terms and conditions'
    },
    {
      label: 'Content',
      icon: <FontAwesome5 name="blog" size={24} />,
      screen: 'content',
      badge: 'New',
      accessibilityLabel: 'View content, New items available'
    },
    {
      label: 'Support',
      icon: <MaterialIcons name="support-agent" size={24} />,
      screen: 'Support',
      accessibilityLabel: 'Get support'
    },
    {
      label: 'Settings',
      icon: <FontAwesome5 name="user-cog" size={24} />,
      screen: 'Settings',
      accessibilityLabel: 'Change app settings'
    },
  ];

  // Function to generate avatar placeholder from user's name
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['right', 'left', 'top']}
    >
      <StatusBar
        backgroundColor={Colors.PRIMARY}
        barStyle="light-content"
        translucent={Platform.OS === 'android'}
      />

      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {userData.avatar ? (
            <Image
              source={{ uri: userData.avatar }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {getInitials(userData.name)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <View style={styles.userRoleBadge}>
            <Text style={styles.userRoleText}>{userData.role}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => handlePress('Profile')}
          accessibilityLabel="Edit your profile"
        >
          <Feather name="edit" size={16} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        {customDrawerItems.map((item, index) => {
          const isActive = activeScreen === item.screen;

          return (
            <Animated.View
              key={item.screen}
              style={{
                transform: [
                  {
                    translateX: animatedValues[item.screen].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0]
                    })
                  },
                  {
                    scale: animatedValues[item.screen]
                  }
                ],
                opacity: animatedValues[item.screen]
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress(item.screen)}
                style={[
                  styles.drawerItem,
                  isActive && styles.activeDrawerItem,
                  { backgroundColor: isActive ? Colors.PRIMARY_LIGHTER : 'transparent' }
                ]}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.accessibilityLabel}
                accessibilityState={{ selected: isActive }}
              >
                <View style={styles.iconContainer}>
                  {React.cloneElement(item.icon, {
                    color: isActive ? Colors.PRIMARY : Colors.SECONDARY,
                  })}
                </View>
                <View style={styles.labelContainer}>
                  <Text
                    style={[
                      styles.drawerLabel,
                      { color: isActive ? Colors.PRIMARY : Colors.SECONDARY },
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                {isActive && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </DrawerContentScrollView>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => {
          // Add a confirmation dialog in a real app
          navigation.navigate('Login');
        }}
        style={styles.logoutContainer}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Log out of your account"
      >
        <View style={styles.iconContainer}>
          <Feather name="log-out" size={24} color='#F32D3D' />
        </View>
        <Text style={styles.logoutLabel}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  profileHeader: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.PRIMARY_LIGHTER,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  avatarText: {
    color: Colors.PRIMARY,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  userEmail: {
    color: Colors.WHITE,
    opacity: 0.8,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  userRoleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  userRoleText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  editProfileButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContent: {
    flexGrow: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
    position: 'relative',
  },
  activeDrawerItem: {
    backgroundColor: Colors.PRIMARY_LIGHTER,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
    backgroundColor: Colors.PRIMARY,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  iconContainer: {
    marginRight: 15,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drawerLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: Math.min(16, screenWidth * 0.04),
    flex: 1,
  },
  badgeContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  badgeText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  logoutLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: Math.min(16, screenWidth * 0.04),
    color: '#F32D3D',
    marginLeft: 15,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.SECONDARY,
    opacity: 0.7,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  }
});

export default CustomDrawerContent;