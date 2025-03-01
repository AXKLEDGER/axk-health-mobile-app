import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// App colors
const Colors = {
  PRIMARY: '#2aa1af',
  PRIMARY_LIGHT: '#3fbecf',
  PRIMARY_LIGHTER: '#7ad4df',
  PRIMARY_DARK: '#1f8a96',
  PRIMARY_DARKER: '#17727c',
  SECONDARY: '#333333',
  SECONDARY_LIGHT: '#666666',
  BACKGROUND: '#FFFFFF',
  TEXT: '#333333',
  ERROR: '#e74c3c',
  SUCCESS: '#27ae60',
  BORDER: '#e0e0e0',
  WARNING: '#ffcb66'
};

export default function Alert() {
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();

  // Animation values
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Button animation values
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const buttonShadowAnim = useRef(new Animated.Value(2)).current;

  // Run entrance animation when the component mounts
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  // Handle close animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setVisible(false));

    // Provide haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleVerifyPress = () => {
    // Button press animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(buttonScaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonShadowAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      ]),
      Animated.parallel([
        Animated.timing(buttonScaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(buttonShadowAnim, {
          toValue: 2,
          duration: 150,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      // Navigate to the verification page
      navigation.navigate('verify');
    });

    // Provide haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.alertDecoration}>
        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />
      </View>

      <View style={styles.alertBox}>
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
          style={styles.alertBackground}
        >
          <View style={styles.alertContent}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[Colors.WARNING, '#ffaa00']}
                style={styles.iconBackground}
              >
                <Feather name="alert-triangle" size={20} color="#fff" />
              </LinearGradient>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.alertTitle}>Verification Required</Text>
              <Text style={styles.alertMessage}>
                Please verify your account in accordance with government policies, so we can better serve you.
              </Text>

              <Animated.View
                style={[
                  styles.buttonContainer,
                  {
                    transform: [{ scale: buttonScaleAnim }],
                    shadowOpacity: buttonShadowAnim.interpolate({
                      inputRange: [1, 2],
                      outputRange: [0.1, 0.2]
                    })
                  }
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleVerifyPress}
                  style={styles.buttonTouchable}
                >
                  <LinearGradient
                    colors={[Colors.PRIMARY, Colors.PRIMARY_DARK]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.verifyButton}
                  >
                    <Text style={styles.verifyButtonText}>Verify Now</Text>
                    <Feather name="arrow-right-circle" size={16} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              accessibilityLabel="Close alert"
              accessibilityRole="button"
            >
              <Feather name="x" size={20} color={Colors.SECONDARY} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    alignSelf: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  alertDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  decorationCircle1: {
    position: 'absolute',
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: Colors.PRIMARY_LIGHTER + '10',
    top: -width * 0.15,
    right: -width * 0.05,
  },
  decorationCircle2: {
    position: 'absolute',
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: Colors.WARNING + '15',
    bottom: -width * 0.1,
    left: width * 0.1,
  },
  alertBox: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.SECONDARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  alertBackground: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  alertContent: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 14,
  },
  iconBackground: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  alertTitle: {
    color: Colors.SECONDARY,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  alertMessage: {
    color: Colors.SECONDARY_LIGHT,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.PRIMARY_DARK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonTouchable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginRight: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.BORDER + '40',
    justifyContent: 'center',
    alignItems: 'center',
  },
});