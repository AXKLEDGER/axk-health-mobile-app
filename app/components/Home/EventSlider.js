import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../../assets/Utils/Colors';
const { width } = Dimensions.get('window');

const events = [
  {
    id: 1,
    title: 'Health Insurance Webinar',
    image: require('../../../assets/Images/blog1.jpg'), // Replace with your image path
    date: 'Oct 20, 2024',
    location: 'Online',
  },
  {
    id: 2,
    title: 'Free Health Checkup Camp',
    image: require('../../../assets/Images/blog2.jpg'), // Replace with your image path
    date: 'Nov 12, 2024',
    location: 'Green Valley Clinic',
  },
  {
    id: 3,
    title: 'Insurance Claims Workshop',
    image: require('../../../assets/Images/blog3.png'), // Replace with your image path
    date: 'Dec 5, 2024',
    location: 'Downtown Hall',
  },
];

export default function EventSlider() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slider}
      >
        {events.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image source={event.image} style={styles.eventImage} />
            <View style={styles.textContainer}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventInfo}>{event.date} | {event.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    color: Colors.SECONDARY,
    paddingHorizontal: 20,
  },
  slider: {
    paddingRight: 20,
  },
  eventCard: {
    width: width * 0.8, // Card width is 80% of the screen width
    marginRight: 15, // Space between cards
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  eventInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins',
  },
});
