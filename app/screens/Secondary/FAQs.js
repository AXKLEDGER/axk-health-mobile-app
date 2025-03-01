import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

const FAQScreen = () => {
  const [collapsed, setCollapsed] = useState({});

  const toggleExpand = (index) => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      question: 'What is the purpose of this app?',
      answer: 'This app allows you to easily manage your health insurance, view coverage details, submit claims, and access your benefit limits and available balances.',
      icon: 'information-circle-outline'
    },
    {
      question: 'How do I submit a claim?',
      answer: 'To submit a claim, go to the "Claims" section, fill out the required details about your treatment, and upload any necessary receipts. Our team will review your claim within 14 days.',
      icon: 'document-text-outline'
    },
    {
      question: 'How do I check my coverage and benefits?',
      answer: 'You can check your coverage, benefit limits, and available balance in the "Benefits" section of the app. You can also track how much of your balance has been used.',
      icon: 'shield-checkmark-outline'
    },
    {
      question: 'Can I update my personal information?',
      answer: 'Yes, you can update your personal details by going to the "Profile" section in the app. Make sure to save changes after updating your information.',
      icon: 'person-outline'
    },
    {
      question: 'What do I do if my claim is denied?',
      answer: 'If your claim is denied, you will receive a notification with details explaining why. You can contact our support team for further clarification or submit an appeal through the app.',
      icon: 'alert-circle-outline'
    },
    {
      question: 'What is covered under my insurance?',
      answer: 'Your insurance covers services like inpatient, outpatient, optical, and dental care, depending on your plan. You can view more details under the "Benefits" section of the app.',
      icon: 'medkit-outline'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact customer support through the "Help & Support" section, use the Live Chat feature, or send an email to support@healthinsuranceapp.com.',
      icon: 'chatbubble-ellipses-outline'
    },
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the "Forgot Password" page and follow the instructions to reset it via email.',
      icon: 'key-outline'
    },
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
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>
            Find answers to the most common questions about our service
          </Text>
        </View>

        {/* FAQ List */}
        {faqs.map((faq, index) => (
          <View key={index} style={styles.accordionContainer}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={faq.icon}
                  size={24}
                  color={Colors.PRIMARY}
                />
              </View>
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons
                name={collapsed[index] ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={Colors.SECONDARY}
              />
            </TouchableOpacity>
            <Collapsible collapsed={!collapsed[index]}>
              <View style={styles.accordionContent}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            </Collapsible>
          </View>
        ))}

        {/* Support Section */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>Need More Help?</Text>
          <TouchableOpacity style={styles.supportButton}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={Colors.WHITE}
            />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  accordionContainer: {
    marginBottom: 15,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    backgroundColor: Colors.PRIMARY + '20',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  accordionContent: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  answer: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.SECONDARY,
    opacity: 0.8,
    lineHeight: 22,
  },
  supportContainer: {
    marginTop: 30,
    backgroundColor: Colors.PRIMARY + '10',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  supportButton: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  supportButtonText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default FAQScreen;