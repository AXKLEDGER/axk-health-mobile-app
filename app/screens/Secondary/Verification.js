import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width, height } = Dimensions.get('window');

// Define app colors
const AppColors = {
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
  PLACEHOLDER: '#aaaaaa'
};

export default function VerificationForm() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    idType: '',
    idNumber: '',
    document: null
  });

  // Form validation state
  const [errors, setErrors] = useState({});

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Form progress
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Input refs for focus handling
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const idTypeRef = useRef(null);
  const idNumberRef = useRef(null);

  // ID type options
  const idTypes = [
    'National ID',
    'Passport',
    'Driver\'s License',
    'Military ID',
    'Other Government ID'
  ];
  const [showIdTypeOptions, setShowIdTypeOptions] = useState(false);

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  // Document picker
  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange('document', result.assets[0].uri);
    }
  };

  // Camera document capture
  const captureDocument = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange('document', result.assets[0].uri);
    }
  };

  // Validate the current step
  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) {
        stepErrors.name = 'Full name is required';
        isValid = false;
      }

      if (!formData.email.trim()) {
        stepErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = 'Email is invalid';
        isValid = false;
      }

      if (!formData.phoneNumber.trim()) {
        stepErrors.phoneNumber = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10,12}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
        stepErrors.phoneNumber = 'Phone number is invalid';
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.idType) {
        stepErrors.idType = 'ID type is required';
        isValid = false;
      }

      if (!formData.idNumber.trim()) {
        stepErrors.idNumber = 'ID number is required';
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.document) {
        stepErrors.document = 'Document upload is required';
        isValid = false;
      }
    }

    setErrors(stepErrors);
    return isValid;
  };

  // Navigate to the next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsLoading(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  // Progress bar computation
  const progressWidth = (currentStep / 3) * 100;

  // Render input field with label and error
  const renderInput = ({
    label,
    field,
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
    icon,
    ref,
    onSubmitEditing
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        errors[field] ? styles.inputError : formData[field] ? styles.inputSuccess : {}
      ]}>
        {icon && (
          <View style={styles.inputIcon}>
            {icon}
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={AppColors.PLACEHOLDER}
          value={formData[field]}
          onChangeText={(text) => handleChange(field, text)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
          autoComplete={field === 'email' ? 'email' : 'off'}
        />
        {errors[field] ? (
          <Feather name="alert-circle" size={20} color={AppColors.ERROR} style={styles.errorIcon} />
        ) : formData[field] ? (
          <Feather name="check-circle" size={20} color={AppColors.SUCCESS} style={styles.errorIcon} />
        ) : null}
      </View>
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  // Render ID Type dropdown
  const renderIdTypeDropdown = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>ID Type</Text>
      <TouchableOpacity
        style={[
          styles.inputWrapper,
          errors.idType ? styles.inputError : formData.idType ? styles.inputSuccess : {}
        ]}
        onPress={() => setShowIdTypeOptions(!showIdTypeOptions)}
      >
        <View style={styles.inputIcon}>
          <FontAwesome5 name="id-card" size={18} color={AppColors.PRIMARY} />
        </View>
        <Text style={[
          styles.input,
          !formData.idType && { color: AppColors.PLACEHOLDER }
        ]}>
          {formData.idType || 'Select ID Type'}
        </Text>
        <Feather
          name={showIdTypeOptions ? "chevron-up" : "chevron-down"}
          size={20}
          color={AppColors.SECONDARY_LIGHT}
          style={styles.errorIcon}
        />
      </TouchableOpacity>
      {errors.idType && (
        <Text style={styles.errorText}>{errors.idType}</Text>
      )}

      {showIdTypeOptions && (
        <View style={styles.dropdownContainer}>
          {idTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                formData.idType === type && styles.dropdownItemSelected,
                index === idTypes.length - 1 && styles.dropdownItemLast
              ]}
              onPress={() => {
                handleChange('idType', type);
                setShowIdTypeOptions(false);
                idNumberRef.current?.focus();
              }}
            >
              <Text style={[
                styles.dropdownItemText,
                formData.idType === type && styles.dropdownItemTextSelected
              ]}>
                {type}
              </Text>
              {formData.idType === type && (
                <Feather name="check" size={16} color={AppColors.PRIMARY} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  // Render document upload
  const renderDocumentUpload = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Upload ID Document</Text>
      <View style={styles.uploadContainer}>
        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickDocument}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[AppColors.PRIMARY_LIGHT, AppColors.PRIMARY_DARK]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadButtonGradient}
            >
              <Feather name="upload" size={20} color="#FFF" />
              <Text style={styles.uploadButtonText}>Select File</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={captureDocument}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[AppColors.PRIMARY, AppColors.PRIMARY_DARKER]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadButtonGradient}
            >
              <Feather name="camera" size={20} color="#FFF" />
              <Text style={styles.uploadButtonText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {formData.document ? (
          <View style={styles.documentPreviewContainer}>
            <Image
              source={{ uri: formData.document }}
              style={styles.documentPreview}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeDocumentButton}
              onPress={() => handleChange('document', null)}
            >
              <Feather name="x" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.documentPlaceholder}>
            <Feather name="file" size={40} color={AppColors.BORDER} />
            <Text style={styles.documentPlaceholderText}>No document selected</Text>
          </View>
        )}

        {errors.document && (
          <Text style={styles.errorText}>{errors.document}</Text>
        )}
      </View>
    </View>
  );

  // Render confirmation screen
  const renderConfirmation = () => (
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationCard}>
        <View style={styles.confirmationHeader}>
          <Text style={styles.confirmationTitle}>Review Your Information</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>Full Name</Text>
          <Text style={styles.confirmationValue}>{formData.name}</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>Email</Text>
          <Text style={styles.confirmationValue}>{formData.email}</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>Phone Number</Text>
          <Text style={styles.confirmationValue}>{formData.phoneNumber}</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>ID Type</Text>
          <Text style={styles.confirmationValue}>{formData.idType}</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>ID Number</Text>
          <Text style={styles.confirmationValue}>{formData.idNumber}</Text>
        </View>

        <View style={styles.confirmationItemContainer}>
          <Text style={styles.confirmationLabel}>Document</Text>
          <Image
            source={{ uri: formData.document }}
            style={styles.confirmationDocument}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );

  // Render success screen
  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <Animated.View
        style={[
          styles.successContent,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <View style={styles.successIconContainer}>
          <Feather name="check-circle" size={80} color={AppColors.SUCCESS} />
        </View>
        <Text style={styles.successTitle}>Verification Submitted!</Text>
        <Text style={styles.successMessage}>
          Your information has been successfully submitted for verification.
          We'll review your documents and get back to you shortly.
        </Text>
        <TouchableOpacity
          style={styles.successButton}
          onPress={() => {
            // Reset the form
            setFormData({
              name: '',
              email: '',
              phoneNumber: '',
              idType: '',
              idNumber: '',
              document: null
            });
            setCurrentStep(1);
            setIsSubmitted(false);
          }}
        >
          <Text style={styles.successButtonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDescription}>
              Please provide your basic personal information to get started with the verification process.
            </Text>

            {renderInput({
              label: 'Full Name',
              field: 'name',
              placeholder: 'Enter your full name',
              icon: <Feather name="user" size={18} color={AppColors.PRIMARY} />,
              onSubmitEditing: () => emailRef.current?.focus()
            })}

            {renderInput({
              label: 'Email Address',
              field: 'email',
              placeholder: 'Enter your email address',
              keyboardType: 'email-address',
              icon: <Feather name="mail" size={18} color={AppColors.PRIMARY} />,
              ref: emailRef,
              onSubmitEditing: () => phoneRef.current?.focus()
            })}

            {renderInput({
              label: 'Phone Number',
              field: 'phoneNumber',
              placeholder: 'Enter your phone number',
              keyboardType: 'phone-pad',
              icon: <Feather name="phone" size={18} color={AppColors.PRIMARY} />,
              ref: phoneRef
            })}
          </>
        );

      case 2:
        return (
          <>
            <Text style={styles.stepTitle}>Identity Information</Text>
            <Text style={styles.stepDescription}>
              Please provide your identification details for verification purposes.
            </Text>

            {renderIdTypeDropdown()}

            {renderInput({
              label: 'ID Number',
              field: 'idNumber',
              placeholder: 'Enter your ID number',
              icon: <Feather name="hash" size={18} color={AppColors.PRIMARY} />,
              ref: idNumberRef
            })}
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.stepTitle}>Document Upload</Text>
            <Text style={styles.stepDescription}>
              Please upload a clear photo of your identification document. Make sure all details are visible.
            </Text>

            {renderDocumentUpload()}
          </>
        );

      case 4:
        return renderConfirmation();

      default:
        return null;
    }
  };

  // Show success screen if submitted
  if (isSubmitted) {
    return renderSuccess();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={AppColors.BACKGROUND} barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Header with Progress Bar */}
            <View style={styles.header}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Step {currentStep} of 4</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progressWidth}%` }
                    ]}
                  />
                </View>
              </View>

              {currentStep > 1 && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={prevStep}
                >
                  <Feather name="chevron-left" size={24} color={AppColors.PRIMARY} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.formContent}>
              {renderStepContent()}
            </View>

            <View style={styles.buttonsContainer}>
              {currentStep < 4 ? (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={nextStep}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[AppColors.PRIMARY, AppColors.PRIMARY_DARK]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.nextButtonGradient}
                  >
                    <Text style={styles.nextButtonText}>Continue</Text>
                    <Feather name="arrow-right" size={20} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[AppColors.PRIMARY, AppColors.PRIMARY_DARK]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.submitButtonGradient}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <>
                        <Text style={styles.submitButtonText}>Submit Verification</Text>
                        <Feather name="check-circle" size={20} color="#FFF" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 16,
    shadowColor: AppColors.SECONDARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: AppColors.BACKGROUND,
    borderBottomColor: AppColors.BORDER,
    borderBottomWidth: 1,
  },
  progressContainer: {
    flex: 1,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.SECONDARY,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: AppColors.BORDER,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.PRIMARY,
    borderRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.BACKGROUND,
    borderWidth: 1,
    borderColor: AppColors.BORDER,
    marginLeft: 10,
  },
  formContent: {
    padding: 20,
  },
  stepTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: AppColors.SECONDARY,
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: AppColors.SECONDARY_LIGHT,
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.SECONDARY,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: AppColors.BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: AppColors.BACKGROUND,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins',
    fontSize: 16,
    color: AppColors.TEXT,
  },
  inputError: {
    borderColor: AppColors.ERROR,
  },
  inputSuccess: {
    borderColor: AppColors.SUCCESS,
  },
  errorIcon: {
    marginLeft: 10,
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: AppColors.ERROR,
    marginTop: 4,
    marginLeft: 4,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 88,
    left: 0,
    right: 0,
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.BORDER,
    zIndex: 10,
    elevation: 4,
    shadowColor: AppColors.SECONDARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemSelected: {
    backgroundColor: `${AppColors.PRIMARY}10`,
  },
  dropdownItemText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: AppColors.TEXT,
  },
  dropdownItemTextSelected: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.PRIMARY,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: AppColors.BORDER,
    borderRadius: 12,
    padding: 16,
    backgroundColor: AppColors.BACKGROUND,
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  uploadButton: {
    width: '48%',
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
  },
  documentPreviewContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  documentPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeDocumentButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentPlaceholder: {
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.BORDER,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${AppColors.BORDER}20`,
  },
  documentPlaceholderText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: AppColors.SECONDARY_LIGHT,
    marginTop: 8,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: AppColors.BORDER,
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  nextButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFF',
    marginRight: 8,
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  submitButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFF',
    marginRight: 8,
  },
  confirmationContainer: {
    flex: 1,
  },
  confirmationCard: {
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.BORDER,
    overflow: 'hidden',
  },
  confirmationHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: `${AppColors.PRIMARY}10`,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER,
  },
  confirmationTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: AppColors.PRIMARY,
  },
  confirmationItemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER,
  },
  confirmationLabel: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: AppColors.SECONDARY_LIGHT,
    marginBottom: 4,
  },
  confirmationValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: AppColors.SECONDARY,
  },
  confirmationDocument: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginTop: 8,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.BACKGROUND,
    padding: 20,
  },
  successContent: {
    width: '100%',
    alignItems: 'center',
    padding: 24,
    backgroundColor: AppColors.BACKGROUND,
    borderRadius: 16,
    shadowColor: AppColors.SECONDARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: AppColors.SECONDARY,
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: AppColors.SECONDARY_LIGHT,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  successButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    backgroundColor: AppColors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFF',
  },
});