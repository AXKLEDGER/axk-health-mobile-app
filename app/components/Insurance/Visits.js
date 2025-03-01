import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function Visits() {
  const [expandedVisit, setExpandedVisit] = useState(null);

  const visits = [
    {
      id: 1,
      clinic: 'City Medical Center',
      status: 'Closed',
      type: 'Outpatient',
      date: '20/09/2023',
      doctor: 'Dr. John Doe',
      treatment: 'General Checkup',
      statusColor: '#FF6B6B'
    },
    {
      id: 2,
      clinic: 'Happy Smiles Dental Clinic',
      status: 'Open',
      type: 'Dental',
      date: '25/09/2023',
      doctor: 'Dr. Jane Smith',
      treatment: 'Teeth Cleaning',
      statusColor: '#4ECDC4'
    },
    {
      id: 3,
      clinic: 'Green Valley Hospital',
      status: 'Closed',
      type: 'Inpatient',
      date: '15/08/2023',
      doctor: 'Dr. Ahmed Khan',
      treatment: 'Appendectomy',
      statusColor: '#FF6B6B'
    },
  ];

  const toggleVisitDetails = (id) => {
    setExpandedVisit(expandedVisit === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>My Visits</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {visits.map((visit) => (
        <TouchableOpacity
          key={visit.id}
          style={styles.visitCard}
          onPress={() => toggleVisitDetails(visit.id)}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={styles.clinicInfo}>
              <Text style={styles.clinicName} numberOfLines={1}>
                {visit.clinic}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: visit.statusColor }
                ]}
              >
                <Text style={styles.statusText}>{visit.status}</Text>
              </View>
            </View>
            <Ionicons
              name={expandedVisit === visit.id ? "chevron-up" : "chevron-forward"}
              size={24}
              color={Colors.SECONDARY}
            />
          </View>

          {expandedVisit === visit.id && (
            <View style={styles.visitDetails}>
              <View style={styles.detailRow}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={Colors.PRIMARY}
                />
                <Text style={styles.detailText}>Date: {visit.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors.PRIMARY}
                />
                <Text style={styles.detailText}>Doctor: {visit.doctor}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons
                  name="medkit-outline"
                  size={20}
                  color={Colors.PRIMARY}
                />
                <Text style={styles.detailText}>Treatment: {visit.treatment}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View All Visits</Text>
        <Ionicons
          name="arrow-forward"
          size={20}
          color={Colors.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
  },
  visitCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clinicInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clinicName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.SECONDARY,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.WHITE,
  },
  visitDetails: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: Colors.SECONDARY,
    marginLeft: 10,
  },
  viewAllButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  viewAllButtonText: {
    color: Colors.WHITE,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginRight: 10,
  },
});