import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
  TEXT_LIGHT: '#666666',
  BORDER: '#e0e0e0'
};

// Enhanced action items with complementary gradients
const QUICK_ACTIONS = [
  {
    id: 'facilities',
    icon: { name: 'hospital-o', type: 'FontAwesome' },
    label: 'Find a Facility',
    route: 'Facilities',
    gradientColors: [Colors.PRIMARY, Colors.PRIMARY_DARK],
    subtext: 'Nearby clinics',
    badge: null
  },
  {
    id: 'records',
    icon: { name: 'book-outline', type: 'Ionicons' },
    label: 'View Records',
    route: 'Records',
    gradientColors: [Colors.PRIMARY_LIGHT, Colors.PRIMARY],
    subtext: 'Medical history',
    badge: '3'
  },
  {
    id: 'benefits',
    icon: { name: 'file-alt', type: 'FontAwesome5' },
    label: 'Check Benefits',
    route: 'Benefits',
    gradientColors: [Colors.PRIMARY_DARK, Colors.PRIMARY_DARKER],
    subtext: 'Plan coverage',
    badge: null
  },
  {
    id: 'support',
    icon: { name: 'support-agent', type: 'MaterialIcons' },
    label: 'Get Support',
    route: 'Support',
    gradientColors: [Colors.PRIMARY, Colors.PRIMARY_LIGHT],
    subtext: '24/7 assistance',
    badge: null
  }
];

// Enhanced icon rendering helper
const renderIcon = (icon, color) => {
  const iconProps = {
    size: 26,
    color: color
  };

  switch (icon.type) {
    case 'FontAwesome':
      return <FontAwesome name={icon.name} {...iconProps} />;
    case 'Ionicons':
      return <Ionicons name={icon.name} {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={icon.name} {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcons name={icon.name} {...iconProps} />;
    default:
      return null;
  }
};

// Action Item Component with animations
const ActionItem = ({ action, index }) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 7,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start();
  }, []);

  const handlePress = () => {
    // Create press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start(() => {
      navigation.navigate(action.route);
    });
  };

  return (
    <Animated.View style={[
      styles.actionItemContainer,
      {
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }]
      }
    ]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.actionItemTouchable}
        accessibilityRole="button"
        accessibilityLabel={action.label}
        accessibilityHint={action.subtext}
      >
        <LinearGradient
          colors={action.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconGradient}
        >
          <View style={styles.iconContainer}>
            {renderIcon(action.icon, '#FFFFFF')}
            {action.badge && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{action.badge}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.labelContainer}>
          <Text style={styles.actionText} numberOfLines={1}>{action.label}</Text>
          <Text style={styles.subText} numberOfLines={1}>{action.subtext}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main QuickActions component
export default function QuickActions() {
  const containerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.outerContainer,
        {
          opacity: containerAnim,
          transform: [
            {
              translateY: containerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }
          ]
        }
      ]}
      accessibilityRole="menu"
      accessibilityLabel="Quick access menu"
    >
      <View style={styles.backgroundDecoration}>
        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />
      </View>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Quick Access</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            accessibilityRole="button"
            accessibilityLabel="View all options"
          >
            <Text style={styles.viewAllText}>View All</Text>
            <FontAwesome5 name="chevron-right" size={12} color={Colors.PRIMARY} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionItemsContainer}>
          {QUICK_ACTIONS.map((action, index) => (
            <ActionItem key={action.id} action={action} index={index} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  decorationCircle1: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: Colors.PRIMARY_LIGHTER + '15',
    top: -width * 0.2,
    right: -width * 0.1,
  },
  decorationCircle2: {
    position: 'absolute',
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: Colors.PRIMARY_LIGHTER + '10',
    bottom: -width * 0.05,
    left: width * 0.1,
  },
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: Colors.BACKGROUND,
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.PRIMARY_DARK + '80',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    letterSpacing: 0.3,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.PRIMARY,
  },
  actionItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionItemContainer: {
    width: '48%',
    marginBottom: 12,
  },
  actionItemTouchable: {
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER,
    ...Platform.select({
      ios: {
        shadowColor: Colors.PRIMARY_DARK + '40',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconGradient: {
    borderRadius: 12,
    padding: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  labelContainer: {
    marginLeft: 12,
    flex: 1,
  },
  actionText: {
    fontSize: 13,
    color: Colors.TEXT,
    fontFamily: 'Poppins-Medium',
  },
  subText: {
    fontSize: 10,
    color: Colors.TEXT_LIGHT,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.PRIMARY_DARK,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: Colors.BACKGROUND,
  },
  badgeText: {
    color: Colors.BACKGROUND,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  }
});