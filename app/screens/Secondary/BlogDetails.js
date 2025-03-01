import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function BlogDetail({ route, navigation }) {
  const { blog } = route.params; // Get the blog details passed from the BlogSlider
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const scrollY = new Animated.Value(0);

  // Sample related articles
  const relatedArticles = [
    {
      id: 1,
      title: "Tips for a Healthier Lifestyle",
      image: require('../../../assets/Images/OnlineTest.png'),
      date: "May 10, 2023"
    },
    {
      id: 2,
      title: "Understanding Your Insurance Coverage",
      image: require('../../../assets/Images/OnlineTest.png'),
      date: "June 5, 2023"
    }
  ];

  // Function to handle sharing the blog
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${blog.title} - Read more at AFRIKABAL Health App`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Animation values for the header
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.animatedHeader,
          { opacity: headerOpacity }
        ]}
      >
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerTitle}>{blog.title}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Feather name="share" size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Hero Image */}
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageScale }] }]}>
          <Image
            source={blog.image}
            style={styles.blogImage}
            resizeMode="cover"
          />
          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonAbsolute}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity> */}
        </Animated.View>

        <View style={styles.contentContainer}>
          {/* Blog Meta Info */}
          <View style={styles.metaContainer}>
            <View style={styles.dateAuthorContainer}>
              <Text style={styles.date}>{blog.date}</Text>
              <View style={styles.dot} />
              <Text style={styles.author}>By {blog.author}</Text>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{blog.category || "Health"}</Text>
            </View>
          </View>

          {/* Blog Title */}
          <Text style={styles.title}>{blog.title}</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setLiked(!liked)}
            >
              <Feather
                name={liked ? "heart" : "heart"}
                size={20}
                color={liked ? "#F44336" : "#666"}
                style={liked && { fontWeight: '900' }}
              />
              <Text style={[styles.actionText, liked && styles.actionActiveText]}>
                {liked ? "Liked" : "Like"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Feather name="share-2" size={20} color="#666" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setBookmarked(!bookmarked)}
            >
              <Feather
                name={bookmarked ? "bookmark" : "bookmark"}
                size={20}
                color={bookmarked ? Colors.PRIMARY : "#666"}
                style={bookmarked && { fontWeight: '900' }}
              />
              <Text style={[styles.actionText, bookmarked && styles.actionActiveText]}>
                {bookmarked ? "Saved" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Blog Content */}
          <View style={styles.contentSection}>
            <Text style={styles.content}>
              {blog.content || `
Healthcare is a fundamental human need, encompassing a wide range of services designed to maintain or improve health through the prevention, diagnosis, treatment, amelioration, or cure of disease, illness, injury, and other physical and mental impairments.

The delivery of modern healthcare depends on an expanding interdisciplinary team of professionals, including physicians, nurse practitioners, nurses, physician assistants, dentists, midwives, dietitians, therapists, psychologists, pharmacists, chiropractors, optometrists, and a variety of allied health professionals.

Preventative healthcare is particularly important, with regular check-ups and screenings helping to detect health issues before they become serious. Proper nutrition, regular exercise, and adequate rest also play critical roles in maintaining good health.

Insurance coverage is a key component of healthcare access for many individuals, helping to manage the often high costs of medical services. Understanding your policy's coverage details, including deductibles, co-pays, and network restrictions, can help you maximize your benefits and minimize out-of-pocket expenses.

For those managing chronic conditions like diabetes, hypertension, or asthma, developing a comprehensive care plan with healthcare providers is essential. This typically includes medication management, regular monitoring, lifestyle modifications, and sometimes specialized treatments or therapies.

Mental health is increasingly recognized as an integral part of overall wellness. Seeking help for conditions like depression, anxiety, or stress is not only acceptable but encouraged as part of a holistic approach to healthcare.

Digital health technologies continue to expand access to care through telemedicine, health apps, and remote monitoring devices. These innovations make it easier for patients to connect with providers, track health metrics, and receive care from the comfort of their homes.
              `}
            </Text>
          </View>

          {/* Author Bio */}
          <View style={styles.authorSection}>
            <View style={styles.authorHeader}>
              <Image
                source={require('../../../assets/Images/avatar3.jpg')}
                style={styles.authorImage}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{blog.author}</Text>
                <Text style={styles.authorRole}>Health Writer</Text>
              </View>
            </View>
            <Text style={styles.authorBio}>
              Experienced health writer with a passion for making complex medical information accessible to everyone. Specializes in wellness, preventive care, and health insurance topics.
            </Text>
          </View>

          {/* Related Articles */}
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Related Articles</Text>

            {relatedArticles.map(article => (
              <TouchableOpacity key={article.id} style={styles.relatedArticle}>
                <Image source={article.image} style={styles.relatedImage} />
                <View style={styles.relatedContent}>
                  <Text style={styles.relatedTitle}>{article.title}</Text>
                  <Text style={styles.relatedDate}>{article.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.PRIMARY,
    zIndex: 1000,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 15,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  blogImage: {
    width: '100%',
    height: '100%',
  },
  backButtonAbsolute: {
    position: 'absolute',
    top: 40,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginHorizontal: 8,
  },
  author: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  categoryContainer: {
    backgroundColor: Colors.PRIMARY + '20',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  category: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.SECONDARY,
    marginBottom: 20,
    lineHeight: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
    marginLeft: 5,
  },
  actionActiveText: {
    color: Colors.PRIMARY,
  },
  contentSection: {
    marginBottom: 25,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Poppins',
    lineHeight: 26,
    color: '#444',
    textAlign: 'justify',
  },
  authorSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  authorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  authorRole: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  authorBio: {
    fontSize: 14,
    fontFamily: 'Poppins',
    lineHeight: 22,
    color: '#444',
  },
  relatedSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 15,
  },
  relatedArticle: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  relatedImage: {
    width: 100,
    height: 100,
  },
  relatedContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  relatedTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 5,
  },
  relatedDate: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#666',
  },
});