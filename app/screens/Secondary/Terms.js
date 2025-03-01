import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Colors from '../../../assets/Utils/Colors';
import Header from '../../components/General/Header';

export default function Terms() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />

      <SafeAreaView style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.text}>
            Welcome to the AXK Health Insurance App. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before accessing the app.
          </Text>
        </View>

        {/* Coverage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Coverage</Text>
          <Text style={styles.text}>
            The AXK Health Insurance App provides health insurance services to registered users. Coverage includes various medical treatments, hospitalization, and prescription drugs as outlined in your insurance plan. Please note that certain treatments, conditions, or medications may not be covered under your plan. For more information, refer to your specific policy document or contact support.
          </Text>
        </View>

        {/* Eligibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Eligibility</Text>
          <Text style={styles.text}>
            You must be a registered user of AXK Health to use this app. Eligibility is determined based on the insurance plan and associated benefits. By using the app, you confirm that you are over the age of 18 and authorized to manage the insurance plan.
          </Text>
        </View>

        {/* Premiums and Payments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Premiums and Payments</Text>
          <Text style={styles.text}>
            All payments for premiums must be made on time and in accordance with the payment schedule outlined in your insurance policy. Failure to pay premiums may result in termination or suspension of your insurance coverage. Payment can be made through the app using secure payment gateways.
          </Text>
        </View>

        {/* Claim Submissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Claim Submissions</Text>
          <Text style={styles.text}>
            Claims for medical treatments can be submitted directly through the app using the multistep claim form. You must provide accurate details regarding the treatment, hospital, and associated expenses. All claims are subject to verification and processing times may vary. Submitting false or fraudulent claims may result in the denial of the claim and potential legal consequences.
          </Text>
        </View>

        {/* Limitations of Coverage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Limitations of Coverage</Text>
          <Text style={styles.text}>
            Certain treatments, procedures, or pre-existing conditions may not be covered under your plan. AXK Health Insurance reserves the right to modify, limit, or deny coverage for any services that are deemed outside the scope of your plan. For detailed information, please refer to your policy or contact our support team.
          </Text>
        </View>

        {/* Privacy and Data Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Privacy and Data Security</Text>
          <Text style={styles.text}>
            We take your privacy and the security of your personal information seriously. By using the app, you agree to our Privacy Policy, which outlines how we collect, store, and process your data. We use industry-standard encryption and security measures to protect your data. However, we cannot guarantee absolute security in the event of unforeseen breaches.
          </Text>
        </View>

        {/* User Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. User Obligations</Text>
          <Text style={styles.text}>
            You agree to provide accurate, complete, and up-to-date information when using the AXK Health Insurance App. You are responsible for safeguarding your account credentials and ensuring that any claims or information you submit are truthful and accurate. Misuse of the app or submission of fraudulent information may result in the termination of your account and legal action.
          </Text>
        </View>

        {/* Termination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Termination</Text>
          <Text style={styles.text}>
            AXK Health Insurance reserves the right to terminate your account and access to the app if you violate these terms and conditions or engage in fraudulent activities. We may also terminate services if required by law or if your insurance policy is canceled or expires.
          </Text>
        </View>

        {/* Changes to Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
          <Text style={styles.text}>
            AXK Health Insurance may update these terms and conditions from time to time. Any changes will be communicated through the app, and continued use of the app constitutes acceptance of the revised terms.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions or concerns regarding these terms and conditions, please contact us at support@axkinsurance.com or through the support section of the app.
          </Text>
        </View>

      </ScrollView>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.PRIMARY,
    marginTop: 30,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.SECONDARY,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: Colors.DARK_GRAY,
    lineHeight: 24,
  },
});