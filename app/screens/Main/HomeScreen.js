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
import GreetingCard from '../../components/General/GreetingsCard';
import QuickActions from '../../components/Home/QuickActions';
import Alert from '../../components/Home/Alert';
import BarChartComponent from '../../components/Home/BarChart';
import TwoCards from '../../components/Home/TwoCards';
import BlogSlider from '../../components/Home/BlogSlider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

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
      <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />

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
        {/* Greeting Card Section */}
        <View style={styles.greetingSection}>
          <GreetingCard />
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <QuickActions />
        </View>

        {/* Alert Section */}
        <View style={styles.section}>
          <Alert />
        </View>

        {/* Bar Chart Section */}
        <View style={styles.section}>
          <BarChartComponent />
        </View>

        {/* Two Cards Section */}
        <View style={styles.section}>
          <TwoCards />
        </View>

        {/* Blog Slider Section */}
        <View style={styles.section}>
          <BlogSlider />
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
  greetingSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  bottomPadding: {
    height: 30,
  },
  // Slider item styles (in case you need them elsewhere)
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