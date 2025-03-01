import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width } = Dimensions.get('window');

const blogs = [
  {
    id: 1,
    title: '10 Tips for a Healthy Lifestyle',
    image: require('../../../assets/Images/blog1.jpg'),
    date: 'Sep 10, 2024',
    author: 'John Doe',
    readTime: '5 min read',
    content: 'This is the full content of the blog post about healthy lifestyle tips...',
    category: 'Wellness'
  },
  {
    id: 2,
    title: 'The Importance of Mental Wellness',
    image: require('../../../assets/Images/blog2.jpg'),
    date: 'Aug 25, 2024',
    author: 'Jane Smith',
    readTime: '4 min read',
    content: 'This blog post focuses on the importance of mental wellness in daily life...',
    category: 'Mental Health'
  },
  {
    id: 3,
    title: 'Health Insurance Explained',
    image: require('../../../assets/Images/blog3.png'),
    date: 'Jul 15, 2024',
    author: 'Samuel Green',
    readTime: '6 min read',
    content: 'In this post, we explain the basics of health insurance, coverage, and claims...',
    category: 'Insurance'
  }
];

export default function BlogSlider() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Latest Blogs</Text>
        <TouchableOpacity
          style={styles.seeAllContainer}
          onPress={() => navigation.navigate('BlogList')}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slider}
      >
        {blogs.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={styles.blogCard}
            onPress={() => navigation.navigate('BlogDetail', { blog })}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <Image
                source={blog.image}
                style={styles.blogImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageOverlay}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{blog.category}</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.blogTitle} numberOfLines={2}>
                {blog.title}
              </Text>
              <View style={styles.blogMetaContainer}>
                <Text style={styles.blogInfo}>
                  {blog.date} | {blog.readTime}
                </Text>
                <View style={styles.authorContainer}>
                  <Text style={styles.authorText}>By {blog.author}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
    marginRight: 5,
  },
  slider: {
    paddingHorizontal: 20,
  },
  blogCard: {
    width: width * 0.75, // Slightly narrower card
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  blogImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  categoryText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  textContainer: {
    padding: 15,
  },
  blogTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 10,
  },
  blogMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogInfo: {
    fontSize: 14,
    color: Colors.SECONDARY,
    opacity: 0.7,
    fontFamily: 'Poppins',
  },
  authorContainer: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  authorText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});