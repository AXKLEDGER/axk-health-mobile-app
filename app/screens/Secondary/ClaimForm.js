import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../assets/Utils/Colors';
import * as DocumentPicker from 'expo-document-picker';

export default function ClaimForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    dob: '',
    treatmentDate: '',
    hospitalName: '',
    amountSpent: '',
    serviceType: '',
    treatmentDescription: '',
    receipt: null,
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleUploadReceipt = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFormData({ ...formData, receipt: result });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {step === 1 && (
        <View>
          <Text style={styles.stepTitle}>Step 1: Basic Details</Text>
          <Text style={styles.description}>Please provide the full name of the patient who received treatment.</Text>
          <TextInput
            style={styles.input}
            placeholder="Patient's Name"
            value={formData.patientName}
            onChangeText={(value) => handleInputChange('patientName', value)}
          />

          <Text style={styles.description}>Enter the patient's date of birth (dd/mm/yyyy).</Text>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={formData.dob}
            onChangeText={(value) => handleInputChange('dob', value)}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.stepTitle}>Step 2: Treatment Details</Text>

          <Text style={styles.description}>When did the treatment take place? (dd/mm/yyyy)</Text>
          <TextInput
            style={styles.input}
            placeholder="Date of Treatment"
            value={formData.treatmentDate}
            onChangeText={(value) => handleInputChange('treatmentDate', value)}
          />

          <Text style={styles.description}>Specify the type of service received (e.g., Inpatient, Outpatient, Dental, etc.).</Text>
          <TextInput
            style={styles.input}
            placeholder="Type of Service"
            value={formData.serviceType}
            onChangeText={(value) => handleInputChange('serviceType', value)}
          />

          <Text style={styles.description}>Briefly describe the treatment received.</Text>
          <TextInput
            style={styles.input}
            placeholder="Treatment Description"
            value={formData.treatmentDescription}
            onChangeText={(value) => handleInputChange('treatmentDescription', value)}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handlePrev}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.stepTitle}>Step 3: Hospital & Expenses</Text>

          <Text style={styles.description}>Enter the name of the hospital or clinic where the treatment occurred.</Text>
          <TextInput
            style={styles.input}
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChangeText={(value) => handleInputChange('hospitalName', value)}
          />

          <Text style={styles.description}>Specify the total amount spent on treatment (in local currency).</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount Spent"
            value={formData.amountSpent}
            onChangeText={(value) => handleInputChange('amountSpent', value)}
            keyboardType="numeric"
          />

          <Text style={styles.description}>Upload a receipt for the treatment. Supported formats: PDF, JPG.</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadReceipt}>
            <Text style={styles.buttonText}>Upload Receipt</Text>
          </TouchableOpacity>
          {formData.receipt && <Text style={styles.receiptName}>Uploaded: {formData.receipt.name}</Text>}

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handlePrev}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert('Claim Submitted!')}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    color: Colors.SECONDARY,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 10,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  receiptName: {
    fontFamily: 'Poppins',
    color: '#333',
    marginTop: 10,
  },
});
