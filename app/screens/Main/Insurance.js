import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/General/Header';
import Colors from '../../../assets/Utils/Colors';
import { useNavigation } from '@react-navigation/native';

// Import Insurance components
import Policy from '../../components/Insurance/Policy';
import Cards from '../../components/Insurance/Cards';
import Claims from '../../components/Insurance/Claims';
import Visits from '../../components/Insurance/Visits';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function InsuranceHomeScreen() {
  const navigation = useNavigation();

  // This renderItem function is kept for reference in case you need to implement a slider
  const renderSliderItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.sliderImage}
        />
        <View style={styles.sliderContent}>
          <Text style={styles.sliderTitle}>{item.title}</Text>
          <View style={styles.categoryRow}>
            <MaterialIcons
              name="category"
              size={14}
              color={Colors.LIGHT_GRAY}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.WHITE}
        translucent={Platform.OS === 'android'}
      />

      {/* Header with SafeAreaView to handle device notches */}
      <SafeAreaView style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>

      {/* Main content in ScrollView */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Policy Section */}
        <View style={styles.section}>
          <Policy />
        </View>

        {/* Cards Section */}
        <View style={styles.section}>
          <Cards />
        </View>

        {/* Claims Section */}
        <View style={[styles.section, { marginVertical: 5 }]}>
          <Claims />
        </View>

        {/* Visits Section */}
        <View style={styles.section}>
          <Visits />
        </View>

        {/* Bottom space for better scrolling */}
        <View style={styles.bottomPadding} />
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
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 25,
  },
  bottomPadding: {
    height: 30,
  },
  // Slider item styles - kept for reference
  sliderItem: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 10,
    width: screenWidth * 0.8,
    height: 120,
    marginHorizontal: screenWidth * -0.06,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderImage: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: 50,
    marginTop: screenHeight * 0.015,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  sliderContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sliderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.WHITE,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.LIGHT_GRAY,
  }
});