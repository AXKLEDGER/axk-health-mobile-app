import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import GreetingCard from '../../components/General/GreetingsCard';
import Header from '../../components/General/Header';
import { Feather } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

export default function Support() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />

      <SafeAreaView style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <View style={styles.greetingContainer}>
          <GreetingCard />
        </View>

        <View style={styles.supportOptions}>
          <Text style={styles.supportTitle}>How can we assist you?</Text>

          <TouchableOpacity style={[styles.button, styles.chatButton]}>
            <View style={styles.buttonContent}>
              <Feather name="message-circle" size={28} color={Colors.WHITE} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, styles.chatButtonText]}>Live Chat</Text>
            </View>
            <Feather name="chevron-right" size={28} color={Colors.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.faqButton]} onPress={() => navigation.navigate('FAQS')}>
            <View style={styles.buttonContent}>
              <Feather name="help-circle" size={28} color={Colors.WHITE} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, styles.faqButtonText]}>FAQs</Text>
            </View>
            <Feather name="chevron-right" size={28} color={Colors.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.contactButton]} onPress={() => navigation.navigate('Contact')}>
            <View style={styles.buttonContent}>
              <Feather name="phone" size={28} color={Colors.PRIMARY} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, styles.contactButtonText]}>Contact Us</Text>
            </View>
            <Feather name="chevron-right" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  greetingContainer: {
    marginVertical: 20,
  },
  supportOptions: {
    marginTop: 40,
  },
  supportTitle: {
    fontSize: screenWidth * 0.055,
    fontFamily: 'Poppins-Bold',
    marginBottom: 30,
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: screenWidth * 0.045,
    fontFamily: 'Poppins-SemiBold',
  },
  chatButton: {
    backgroundColor: Colors.PRIMARY,
  },
  chatButtonText: {
    color: Colors.WHITE,
  },
  faqButton: {
    backgroundColor: Colors.SECONDARY,
  },
  faqButtonText: {
    color: Colors.WHITE,
  },
  contactButton: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
  contactButtonText: {
    color: Colors.PRIMARY,
  },
});