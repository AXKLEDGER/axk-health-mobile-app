import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import BlogSlider from '../../components/Home/BlogSlider';
import EventSlider from '../../components/Home/EventSlider';
import Header from '../../components/General/Header';

export default function ContentPage() {
  return (
    <View style={styles.container}>
      <Header /> 
      <ScrollView>
        <BlogSlider />
        <EventSlider />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
