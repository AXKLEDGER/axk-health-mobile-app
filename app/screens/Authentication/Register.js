import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo or have this library

import Colors from '../../../assets/Utils/Colors';
import GoogleIcon from '../../../assets/Images/GoogleIcon.png';
import UIImg from '../../../assets/Images/UI1.png';
import UIImg2 from '../../../assets/Images/Ui3.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function RegisterScreen() {
  const navigation = useNavigation();

  // State for form inputs
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation function
  const validateForm = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      Alert.alert('Error', 'Please enter an email address');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Perform registration logic here
      // For now, navigate to Onboarding
      navigation.navigate('Onboarding');
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic
    Alert.alert('Google Sign-In', 'Google Sign-In functionality to be implemented');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.PRIMARY }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{
            flex: 1,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            padding: 20,
            paddingTop: 40,
            justifyContent: 'center',
          }}>
            {/* Background Images */}
            <Image
              source={UIImg}
              style={{
                width: screenWidth * 0.9,
                height: screenHeight * 0.7,
                position: 'absolute',
                top: 0,
                right: 0,
                opacity: 0.5
              }}
              resizeMode="contain"
            />

            {/* Header Text */}
            <Text style={{
              color: Colors.WHITE,
              fontSize: screenWidth * 0.06,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              marginBottom: 10
            }}>
              Create Your Account
            </Text>
            <Text style={{
              color: Colors.WHITE,
              fontSize: screenWidth * 0.035,
              fontWeight: '500',
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              marginBottom: 20
            }}>
              Join us and get insured today!
            </Text>

            {/* Input Fields Container */}
            <View style={{ alignItems: 'center' }}>
              {/* Email Input */}
              <View style={{
                width: screenWidth * 0.9,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
                backgroundColor: Colors.WHITE,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={Colors.SECONDARY}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="Enter Email"
                  placeholderTextColor={Colors.SECONDARY}
                  style={{
                    flex: 1,
                    height: screenHeight * 0.06,
                    color: Colors.SECONDARY,
                    fontFamily: 'Poppins-Medium',
                    fontSize: screenWidth * 0.035
                  }}
                />
              </View>

              {/* Password Input */}
              <View style={{
                width: screenWidth * 0.9,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
                backgroundColor: Colors.WHITE,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.SECONDARY}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Enter Password"
                  placeholderTextColor={Colors.SECONDARY}
                  style={{
                    flex: 1,
                    height: screenHeight * 0.06,
                    color: Colors.SECONDARY,
                    fontFamily: 'Poppins-Medium',
                    fontSize: screenWidth * 0.035
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={Colors.SECONDARY}
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View style={{
                width: screenWidth * 0.9,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
                backgroundColor: Colors.WHITE,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.SECONDARY}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.SECONDARY}
                  style={{
                    flex: 1,
                    height: screenHeight * 0.06,
                    color: Colors.SECONDARY,
                    fontFamily: 'Poppins-Medium',
                    fontSize: screenWidth * 0.035
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={Colors.SECONDARY}
                  />
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                style={{
                  width: screenWidth * 0.9,
                  height: screenHeight * 0.06,
                  borderRadius: 10,
                  marginBottom: 15,
                  backgroundColor: Colors.WHITE,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text style={{
                  color: Colors.PRIMARY,
                  fontFamily: 'Poppins-Medium',
                  fontSize: screenWidth * 0.035,
                  fontWeight: 'bold'
                }}>
                  Create Account
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: screenWidth * 0.9,
                marginBottom: 15
              }}>
                <View style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: Colors.WHITE
                }} />
                <Text style={{
                  marginHorizontal: 10,
                  color: Colors.WHITE,
                  fontFamily: 'Poppins-Medium'
                }}>
                  Or
                </Text>
                <View style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: Colors.WHITE
                }} />
              </View>

              {/* Google Sign-In Button */}
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.WHITE,
                  width: screenWidth * 0.9,
                  height: screenHeight * 0.06,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Image
                  source={GoogleIcon}
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Text style={{
                  fontSize: screenWidth * 0.035,
                  color: Colors.SECONDARY,
                  fontFamily: 'Poppins-Medium',
                  fontWeight: 'bold'
                }}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center'
              }}>
                <Text style={{
                  color: Colors.WHITE,
                  fontSize: screenWidth * 0.035,
                  fontFamily: 'Poppins-Medium',
                }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{
                    color: Colors.WHITE,
                    fontSize: screenWidth * 0.035,
                    fontFamily: 'Poppins-Medium',
                    marginLeft: 5,
                    textDecorationLine: 'underline'
                  }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Background Image */}
      <Image
        source={UIImg2}
        style={{
          width: screenWidth * 1,
          height: screenHeight * 0.5,
          position: 'absolute',
          bottom: -250,
          left: -100,
          opacity: 0.2
        }}
        resizeMode="contain"
      />
    </KeyboardAvoidingView>
  );
}