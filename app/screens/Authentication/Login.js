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
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../assets/Utils/Colors';
import GoogleIcon from '../../../assets/Images/GoogleIcon.png';
import UIImg from '../../../assets/Images/UI1.png';
import UIImg2 from '../../../assets/Images/Ui3.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();

  // State management
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Comprehensive validation
  const validateCredentials = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  // Login handler
  const handleLogin = async () => {
    if (validateCredentials()) {
      try {
        // Placeholder for actual authentication logic
        const response = await authenticateUser(email, password);

        if (response.success) {
          navigation.navigate('Drawer');
        } else {
          Alert.alert('Login Failed', response.message || 'Unable to log in. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  // Simulated authentication (replace with actual implementation)
  const authenticateUser = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: email === 'user@example.com' && password === 'password123',
          message: email === 'user@example.com' ? 'Success' : 'Invalid credentials'
        });
      }, 1000);
    });
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In
    Alert.alert('Google Sign-In', 'Google authentication is not yet implemented');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
            {/* Original Background Image */}
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
              Welcome Back
            </Text>
            <Text style={{
              color: Colors.WHITE,
              fontSize: screenWidth * 0.035,
              fontWeight: '500',
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              marginBottom: 20
            }}>
              Sign in to continue
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
                  placeholder="Email Address"
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
                marginBottom: 10,
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
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Password"
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
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={Colors.SECONDARY}
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  marginBottom: 15
                }}
              >
                <Text style={{
                  color: Colors.WHITE,
                  fontSize: screenWidth * 0.035,
                  fontFamily: 'Poppins-Medium',
                  textDecorationLine: 'underline'
                }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
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
                  Sign In
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
                  or
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
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
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
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={{
                    color: Colors.WHITE,
                    fontSize: screenWidth * 0.035,
                    fontFamily: 'Poppins-Medium',
                    marginLeft: 5,
                    textDecorationLine: 'underline'
                  }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Original Bottom Background Image */}
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