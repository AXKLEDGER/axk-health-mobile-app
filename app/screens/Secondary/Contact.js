import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

const ContactScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const contactMethods = [
    {
      icon: 'call-outline',
      text: '+250 725 354 096',
      type: 'phone'
    },
    {
      icon: 'mail-outline',
      text: 'support@axk.com',
      type: 'email'
    },
    {
      icon: 'location-outline',
      text: '123 Bumbogo St, Kigali, Rwanda',
      type: 'address'
    }
  ];

  const socialPlatforms = [
    {
      name: 'facebook',
      url: 'https://facebook.com',
      icon: 'logo-facebook'
    },
    {
      name: 'twitter',
      url: 'https://twitter.com',
      icon: 'logo-twitter'
    },
    {
      name: 'instagram',
      url: 'https://instagram.com',
      icon: 'logo-instagram'
    },
    {
      name: 'linkedin',
      url: 'https://linkedin.com',
      icon: 'logo-linkedin'
    }
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.WHITE, '#F7F7F7']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            We're here to help and answer any question you might have
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => {
                if (method.type === 'phone') Linking.openURL(`tel:${method.text}`);
                if (method.type === 'email') Linking.openURL(`mailto:${method.text}`);
              }}
            >
              <View style={styles.contactIconContainer}>
                <Ionicons
                  name={method.icon}
                  size={24}
                  color={Colors.PRIMARY}
                />
              </View>
              <Text style={styles.contactText}>{method.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media Links */}
        <View style={styles.socialContainer}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialIconsContainer}>
            {socialPlatforms.map((platform, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialIcon}
                onPress={() => openLink(platform.url)}
              >
                <Ionicons
                  name={platform.icon}
                  size={30}
                  color={Colors.PRIMARY}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Support */}
        <View style={styles.quickSupportContainer}>
          <Text style={styles.sectionTitle}>Need Immediate Help?</Text>
          <TouchableOpacity style={styles.supportButton}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={Colors.WHITE}
            />
            <Text style={styles.supportButtonText}>Start Live Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 AXK Health. All rights reserved.
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    opacity: 0.7,
  },
  contactSection: {
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
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
  contactIconContainer: {
    marginRight: 15,
    backgroundColor: Colors.PRIMARY + '20',
    borderRadius: 20,
    padding: 10,
  },
  contactText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.SECONDARY,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  socialContainer: {
    marginBottom: 30,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: {
    backgroundColor: Colors.PRIMARY + '20',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickSupportContainer: {
    marginBottom: 30,
  },
  supportButton: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: Colors.SECONDARY,
    opacity: 0.7,
  },
});

export default ContactScreen;