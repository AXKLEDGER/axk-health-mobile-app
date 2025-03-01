import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../../../assets/Utils/Colors';
import GoogleIcon from '../../../assets/Images/GoogleIcon.png';
import { useNavigation } from '@react-navigation/native';
import UIImg from '../../../assets/Images/UI1.png'
import UIImg2 from '../../../assets/Images/Ui3.png'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ForgotPassword() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Drawer');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
         
          <View style={{
            flex: 1, // Ensure it takes up the remaining space
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            padding: 20,
            paddingTop: 20, // Add padding at the top for better spacing
            justifyContent: 'center', // Center the content vertically
          }}>
            <Image source={UIImg} style={{width: screenWidth * 0.9, height: screenHeight * 0.7, position: 'absolute', top: 0, right: 0,  opacity: 0.5  }} />
            <Text style={{ 
              color: Colors.WHITE, 
              fontSize: screenWidth * 0.06, 
              textAlign: 'center', 
              fontFamily: 'Poppins-Medium', 
              marginTop: 1 
            }}>
              Having trouble getting in?
            </Text>
            <Text style={{ 
              color: Colors.WHITE, 
              fontSize: screenWidth * 0.035, 
              fontWeight: '500', 
              textAlign: 'center', 
              fontFamily: 'Poppins-Medium', 
              marginTop: 1 
            }}>
              No worries, just enter your email or mobile number for an otp or reset link
            </Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <TextInput
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email, Username, or Mobile Number"
                style={{ 
                  width: screenWidth * 0.9, 
                  height: screenHeight * 0.06, 
                  borderRadius: 10, 
                  marginTop: 20, 
                  borderWidth: 1, 
                  borderColor: Colors.WHITE, 
                  backgroundColor: Colors.WHITE, 
                  paddingLeft: 20, 
                  color: Colors.SECONDARY, 
                  fontFamily: 'Poppins-Medium', 
                  fontSize: screenWidth * 0.035
                }}
              />
           
           
             
              <TouchableOpacity
                onPress={handleLogin}
                style={{
                  width: screenWidth * 0.9,
                  height: screenHeight * 0.06,
                  borderRadius: 10,
                  marginTop: 20,
                  backgroundColor: Colors.WHITE,
                  borderWidth: 1,
                  borderColor: Colors.WHITE,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ 
                  color: Colors.PRIMARY, 
                  fontFamily: 'Poppins-Medium', 
                  fontSize: screenWidth * 0.035 
                }}>
                  Get Code
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ 
              color: Colors.WHITE, 
              fontSize: screenWidth * 0.035, 
              fontWeight: '500', 
              textAlign: 'center', 
              fontFamily: 'Poppins-Medium', 
              marginTop: 20 
            }}>
              - Or -
            </Text>
            <TouchableOpacity 
              style={{ 
                flexDirection: 'row', 
                backgroundColor: Colors.WHITE, 
                width: screenWidth * 0.9, 
                height: screenHeight * 0.06, 
                borderRadius: 10, 
                marginTop: 10, 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <Image source={GoogleIcon} style={{ width: 35, height: 35 }} />
              <Text style={{ 
                fontSize: screenWidth * 0.035, 
                color: Colors.SECONDARY, 
                marginLeft: 10, 
                fontFamily: 'Poppins-Medium' 
              }}>
                Continue with Google
              </Text>
            </TouchableOpacity>
            <View style={{ 
              flexDirection: 'row', 
              marginTop: 20,
              justifyContent: 'center' 
            }}>
              <Text style={{ 
                color: Colors.WHITE, 
                fontSize: screenWidth * 0.035, 
                fontWeight: '500', 
                fontFamily: 'Poppins-Medium',  
              }}>
                Don't have an account?
              </Text>
              <Text 
                style={{ 
                  color: Colors.WHITE, 
                  fontSize: screenWidth * 0.035, 
                  fontWeight: '500', 
                  fontFamily: 'Poppins-Medium',  
                  marginLeft: 5
                }}  
                onPress={() => navigation.navigate('Register')}
              >
                Register
              </Text>
            </View>
          </View>
        </View>
     
      </ScrollView>
      <Image source={UIImg2} style={{width: screenWidth * 1, height: screenHeight * 0.5, position: 'absolute', bottom: -250, left: -100,  opacity: 0.2  }} />
    </KeyboardAvoidingView>
  );
}
