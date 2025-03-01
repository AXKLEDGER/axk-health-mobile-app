import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HealthDetail = ({ route, navigation }) => {
    // Get the screen type from route params
    const { screenType } = route.params || { screenType: 'HealthWellness' };

    const [activeTab, setActiveTab] = useState('overview');

    // Define screen-specific data for each type of card
    const screenData = {
        HealthWellness: {
            title: 'Health and Wellness',
            gradient: ['#4CB8C4', '#3CD3AD'],
            icon: 'fitness-outline',
            description: 'Track your health metrics, access wellness programs, and maintain your fitness journey all in one place.',
            stats: [
                { icon: 'heart-outline', label: 'Heart Rate', value: '72 bpm', status: 'normal' },
                { icon: 'footsteps', label: 'Steps Today', value: '8,456', status: 'good' },
                { icon: 'bed-outline', label: 'Sleep', value: '7.2 hrs', status: 'normal' }
            ],
            activities: [
                {
                    title: 'Morning Walk',
                    icon: 'walk',
                    time: '06:30 AM',
                    duration: '30 min',
                    calories: '120 kcal',
                    distance: '2.3 km'
                },
                {
                    title: 'Gym Session',
                    icon: 'weight-lifter',
                    time: '05:45 PM',
                    duration: '45 min',
                    calories: '320 kcal',
                    distance: '-'
                }
            ],
            programs: [
                {
                    title: 'Stress Management Program',
                    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    duration: '4 weeks',
                    progress: 35
                },
                {
                    title: 'Weight Management',
                    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    duration: '8 weeks',
                    progress: 62
                }
            ]
        },
        HealthInsurance: {
            title: 'Health Insurance',
            gradient: ['#FF6B6B', '#4ECDC4'],
            icon: 'shield-checkmark-outline',
            description: 'Manage your health insurance policy, track claims, and access coverage details easily.',
            policySummary: {
                policyNumber: 'AXK-12345678',
                policyHolder: 'John Doe',
                startDate: 'Jan 01, 2023',
                renewalDate: 'Jan 01, 2024',
                coverageAmount: '$500,000',
                premiumAmount: '$199.50/month'
            },
            recentClaims: [
                {
                    claimId: 'CLM-2023-001',
                    date: 'Mar 15, 2023',
                    hospital: 'City General Hospital',
                    amount: '$345.00',
                    status: 'Approved'
                },
                {
                    claimId: 'CLM-2023-002',
                    date: 'May 22, 2023',
                    hospital: 'MediCare Clinic',
                    amount: '$128.50',
                    status: 'Processing'
                }
            ],
            coverageDetails: [
                { type: 'Hospitalization', coverage: '100%', limit: '$300,000', icon: 'hospital-building' },
                { type: 'Outpatient Care', coverage: '80%', limit: '$10,000/year', icon: 'doctor' },
                { type: 'Prescription Drugs', coverage: '70%', limit: '$5,000/year', icon: 'pill' },
                { type: 'Emergency Care', coverage: '100%', limit: '$50,000', icon: 'ambulance' }
            ]
        }
    };

    // Get the data for the current screen type
    const data = screenData[screenType];

    const renderHeader = () => (
        <LinearGradient
            colors={data.gradient}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{data.title}</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <Feather name="more-vertical" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContent}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={data.icon} size={30} color="#fff" />
                    </View>
                    <Text style={styles.headerDescription}>{data.description}</Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                onPress={() => setActiveTab('overview')}
            >
                <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'details' && styles.activeTab]}
                onPress={() => setActiveTab('details')}
            >
                <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                onPress={() => setActiveTab('history')}
            >
                <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHealthWellnessContent = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Health Stats Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Health Stats</Text>
                <View style={styles.statsContainer}>
                    {data.stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Ionicons
                                name={stat.icon}
                                size={24}
                                color={
                                    stat.status === 'good' ? '#4CAF50' :
                                        stat.status === 'warning' ? '#FFC107' :
                                            stat.status === 'alert' ? '#F44336' :
                                                Colors.PRIMARY
                                }
                            />
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recent Activities Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activities</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {data.activities.map((activity, index) => (
                    <View key={index} style={styles.activityCard}>
                        <View style={styles.activityIconContainer}>
                            <MaterialCommunityIcons name={activity.icon} size={24} color="#fff" />
                        </View>
                        <View style={styles.activityDetails}>
                            <Text style={styles.activityTitle}>{activity.title}</Text>
                            <Text style={styles.activityTime}>{activity.time}</Text>
                        </View>
                        <View style={styles.activityStats}>
                            <View style={styles.activityStat}>
                                <Feather name="clock" size={14} color={Colors.DARK_GRAY} />
                                <Text style={styles.activityStatText}>{activity.duration}</Text>
                            </View>
                            <View style={styles.activityStat}>
                                <Feather name="zap" size={14} color={Colors.DARK_GRAY} />
                                <Text style={styles.activityStatText}>{activity.calories}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Wellness Programs Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Wellness Programs</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>Explore</Text>
                    </TouchableOpacity>
                </View>

                {data.programs.map((program, index) => (
                    <View key={index} style={styles.programCard}>
                        <Image source={{ uri: program.image }} style={styles.programImage} />
                        <View style={styles.programOverlay}>
                            <View style={styles.programContent}>
                                <Text style={styles.programTitle}>{program.title}</Text>
                                <Text style={styles.programDuration}>{program.duration}</Text>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBackground}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                { width: `${program.progress}%` }
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.progressText}>{program.progress}% Complete</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderHealthInsuranceContent = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Policy Summary Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Policy Summary</Text>
                <View style={styles.policyCard}>
                    <View style={styles.policySummaryItem}>
                        <Text style={styles.policyLabel}>Policy Number</Text>
                        <Text style={styles.policyValue}>{data.policySummary.policyNumber}</Text>
                    </View>
                    <View style={styles.policySummaryItem}>
                        <Text style={styles.policyLabel}>Policy Holder</Text>
                        <Text style={styles.policyValue}>{data.policySummary.policyHolder}</Text>
                    </View>
                    <View style={styles.policyDates}>
                        <View style={styles.policyDateItem}>
                            <Text style={styles.policyLabel}>Start Date</Text>
                            <Text style={styles.policyValue}>{data.policySummary.startDate}</Text>
                        </View>
                        <View style={styles.policyDateItem}>
                            <Text style={styles.policyLabel}>Renewal Date</Text>
                            <Text style={styles.policyValue}>{data.policySummary.renewalDate}</Text>
                        </View>
                    </View>
                    <View style={styles.policySummaryItem}>
                        <Text style={styles.policyLabel}>Coverage Amount</Text>
                        <Text style={styles.coverageValue}>{data.policySummary.coverageAmount}</Text>
                    </View>
                    <View style={styles.policySummaryItem}>
                        <Text style={styles.policyLabel}>Premium</Text>
                        <Text style={styles.policyValue}>{data.policySummary.premiumAmount}</Text>
                    </View>
                </View>
            </View>

            {/* Recent Claims Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Claims</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                {data.recentClaims.map((claim, index) => (
                    <View key={index} style={styles.claimCard}>
                        <View style={styles.claimHeader}>
                            <View>
                                <Text style={styles.claimId}>{claim.claimId}</Text>
                                <Text style={styles.claimDate}>{claim.date}</Text>
                            </View>
                            <View style={[
                                styles.statusBadge,
                                {
                                    backgroundColor: claim.status === 'Approved' ? '#E8F5E9' :
                                        claim.status === 'Processing' ? '#E3F2FD' :
                                            claim.status === 'Rejected' ? '#FFEBEE' : '#F5F5F5'
                                }
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    {
                                        color: claim.status === 'Approved' ? '#4CAF50' :
                                            claim.status === 'Processing' ? '#2196F3' :
                                                claim.status === 'Rejected' ? '#F44336' : '#757575'
                                    }
                                ]}>{claim.status}</Text>
                            </View>
                        </View>

                        <View style={styles.claimDetails}>
                            <Text style={styles.claimHospital}>{claim.hospital}</Text>
                            <Text style={styles.claimAmount}>{claim.amount}</Text>
                        </View>

                        <TouchableOpacity style={styles.viewDetailsButton}>
                            <Text style={styles.viewDetailsText}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Coverage Details Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Coverage Details</Text>

                {data.coverageDetails.map((item, index) => (
                    <View key={index} style={styles.coverageItem}>
                        <View style={styles.coverageIconContainer}>
                            <MaterialCommunityIcons name={item.icon} size={20} color="#fff" />
                        </View>
                        <View style={styles.coverageInfo}>
                            <Text style={styles.coverageType}>{item.type}</Text>
                            <Text style={styles.coverageLimit}>Limit: {item.limit}</Text>
                        </View>
                        <View style={styles.coveragePercentContainer}>
                            <Text style={styles.coveragePercent}>{item.coverage}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {renderHeader()}
            {renderTabs()}

            {screenType === 'HealthWellness'
                ? renderHealthWellnessContent()
                : renderHealthInsuranceContent()
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    safeArea: {
        width: '100%',
    },
    header: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backButton: {
        padding: 5,
    },
    moreButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerDescription: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 24,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.PRIMARY,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#666',
    },
    activeTabText: {
        fontFamily: 'Poppins-Medium',
        color: Colors.PRIMARY,
    },
    content: {
        flex: 1,
        paddingTop: 15,
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
        marginBottom: 15,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: Colors.PRIMARY,
    },

    // Health Stats Styles
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
        marginTop: 10,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#666',
        marginTop: 5,
    },

    // Activity Styles
    activityCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    activityIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    activityDetails: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
        marginBottom: 3,
    },
    activityTime: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#666',
    },
    activityStats: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    activityStat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    activityStatText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: Colors.DARK_GRAY,
        marginLeft: 5,
    },

    // Program Styles
    programCard: {
        height: 180,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        position: 'relative',
    },
    programImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    programOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 15,
    },
    programContent: {
    },
    programTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
        marginBottom: 5,
    },
    programDuration: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 10,
    },
    progressContainer: {
        marginTop: 5,
    },
    progressBackground: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#fff',
        marginTop: 5,
    },

    // Policy Styles
    policyCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    policySummaryItem: {
        marginBottom: 15,
    },
    policyDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    policyDateItem: {
        width: '48%',
    },
    policyLabel: {
        fontSize: 12,
        fontFamily: 'Poppins',
        color: '#666',
        marginBottom: 3,
    },
    policyValue: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
    },
    coverageValue: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: Colors.PRIMARY,
    },

    // Claim Styles
    claimCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    claimHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    claimId: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
    },
    claimDate: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#666',
        marginTop: 3,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    claimDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    claimHospital: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: Colors.SECONDARY,
    },
    claimAmount: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.PRIMARY,
    },
    viewDetailsButton: {
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    viewDetailsText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: Colors.PRIMARY,
    },

    // Coverage Styles
    coverageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    coverageIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    coverageInfo: {
        flex: 1,
    },
    coverageType: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.SECONDARY,
    },
    coverageLimit: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#666',
        marginTop: 3,
    },
    coveragePercentContainer: {
        backgroundColor: Colors.PRIMARY + '20',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    coveragePercent: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: Colors.PRIMARY,
    },
});

export default HealthDetail;