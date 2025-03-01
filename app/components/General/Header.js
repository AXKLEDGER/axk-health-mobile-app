import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Text, Animated, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../../assets/Utils/Colors';
import ProfileAvatar from '../../../assets/Images/avatar4.jpg';

const { width: screenWidth } = Dimensions.get('window');

const placeholders = [
  'Find Hospitals',
  'Find Doctors',
  'Find Pharmacies',
];

export default function Header() {
  const navigation = useNavigation();
  const [placeholderText, setPlaceholderText] = useState(placeholders[0]);
  const [isTyping, setIsTyping] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current; // Start at visible position
  const opacity = useRef(new Animated.Value(1)).current; // Start fully visible

  useEffect(() => {
    if (!isTyping) {
      const interval = setInterval(() => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0, // Fade out
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 20, // Slide down
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(translateY, {
            toValue: -20, // Reset position for new text
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1, // Fade in
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0, // Slide back to visible position
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        setPlaceholderText(prev => {
          const currentIndex = placeholders.indexOf(prev);
          const nextIndex = (currentIndex + 1) % placeholders.length;
          return placeholders[nextIndex];
        });
      }, 4000);

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [isTyping, translateY, opacity]);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Icon name="menu" size={24} color={Colors.SECONDARY} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#888"
          onChangeText={(text) => {
            setIsTyping(text.length > 0); // Set typing state based on input
          }}
          onBlur={() => setIsTyping(false)} // Clear typing state when input loses focus
        />
        {!isTyping && (
          <Animated.View
            style={[
              styles.placeholderOverlay,
              {
                opacity: opacity,
                transform: [{ translateY }],
                pointerEvents: 'none', // Make sure this view doesn't block touch events
              },
            ]}
          >
            <Text style={styles.placeholderText}>
              {placeholderText}
            </Text>
          </Animated.View>
        )}
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.iconContainer}
        >
          <Icon name="bell" size={24} color={Colors.SECONDARY} />
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={ProfileAvatar}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingTop: 10,
  },
  menuButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginLeft: 10,
    flex: 1,
    height: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 35,
    color: Colors.SECONDARY,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  placeholderOverlay: {
    position: 'absolute',
    left: 40,
    top: 0,
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  placeholderText: {
    color: '#888',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconContainer: {
    marginRight: 10,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
});