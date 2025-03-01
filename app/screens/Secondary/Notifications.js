import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';
import NotificationsImg from '../../../assets/Images/NotificationsImg.png';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Enhanced notifications data with permission requests
const notificationsData = [
  {
    id: '1',
    type: 'permission',
    content: 'Dr. Sarah Johnson requests permission to access your medical records',
    description: 'General health checkup - Appointment on May 15, 2023',
    practitioner: {
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      hospital: 'City Medical Center',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    createdAt: '2 hours ago',
    unread: true,
    requiresAction: true
  },
  {
    id: '2',
    type: 'file-text',
    content: 'Your health insurance claim has been approved',
    description: 'Claim #HD28935 - Amount: $345.00',
    createdAt: '5 hours ago',
    unread: true
  },
  {
    id: '3',
    type: 'permission',
    content: 'Dr. Michael Chen requests permission to access your lab results',
    description: 'Cardiology consultation - Appointment on May 17, 2023',
    practitioner: {
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      hospital: 'Heart & Vascular Institute',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    createdAt: '1 day ago',
    unread: true,
    requiresAction: true
  },
  {
    id: '4',
    type: 'calendar',
    content: 'Your next health check-up is scheduled for tomorrow',
    description: 'Dr. Sarah Johnson - City Medical Center - 10:30 AM',
    createdAt: '1 day ago',
    unread: false
  },
  {
    id: '5',
    type: 'check-circle',
    content: 'Your monthly premium payment was successful',
    description: 'Premium payment for May 2023 - $199.50',
    createdAt: '2 days ago',
    unread: false
  },
  {
    id: '6',
    type: 'alert-triangle',
    content: 'Policy renewal due soon',
    description: 'Your health insurance policy expires in 10 days',
    createdAt: '3 days ago',
    unread: false
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'unread', 'permissions'

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    setShowOptions(null);
  };

  const deleteSelectedNotifications = () => {
    setNotifications(notifications.filter(notification => !selectedNotifications.includes(notification.id)));
    setSelectedNotifications([]);
  };

  const handleOptionsPress = (id) => {
    setShowOptions(showOptions === id ? null : id);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, unread: false } : notification
    ));
    setShowOptions(null);
  };

  const handleSelectNotification = (id) => {
    setSelectedNotifications(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    );
  };

  const handlePermissionRequest = (item) => {
    setSelectedPermission(item);
    setModalVisible(true);
  };

  const respondToPermissionRequest = (accepted) => {
    setNotifications(notifications.map(notification =>
      notification.id === selectedPermission.id
        ? {
          ...notification,
          unread: false,
          requiresAction: false,
          status: accepted ? 'accepted' : 'declined'
        }
        : notification
    ));
    setModalVisible(false);
  };

  const unreadNotifications = notifications.some(notification => notification.unread);
  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return notification.unread;
    if (filterType === 'permissions') return notification.type === 'permission';
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'permission':
        return <FontAwesome5 name="user-md" size={20} color={Colors.PRIMARY} style={styles.notificationIcon} />;
      case 'file-text':
        return <Feather name="file-text" size={20} color="#4CAF50" style={styles.notificationIcon} />;
      case 'calendar':
        return <Feather name="calendar" size={20} color="#2196F3" style={styles.notificationIcon} />;
      case 'check-circle':
        return <Feather name="check-circle" size={20} color="#4CAF50" style={styles.notificationIcon} />;
      case 'alert-triangle':
        return <Feather name="alert-triangle" size={20} color="#FFC107" style={styles.notificationIcon} />;
      case 'alert-circle':
        return <Feather name="alert-circle" size={20} color="#F44336" style={styles.notificationIcon} />;
      case 'info':
        return <Feather name="info" size={20} color="#2196F3" style={styles.notificationIcon} />;
      default:
        return <Feather name="bell" size={20} color="#888" style={styles.notificationIcon} />;
    }
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationContainer, item.unread && styles.unreadContainer]}>
      <TouchableOpacity onPress={() => handleSelectNotification(item.id)}>
        <Feather
          name={selectedNotifications.includes(item.id) ? 'check-square' : 'square'}
          size={20}
          color={Colors.PRIMARY}
          style={styles.selectIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.notificationContent}
        onPress={() => {
          if (item.type === 'permission' && item.requiresAction) {
            handlePermissionRequest(item);
          } else {
            markNotificationAsRead(item.id);
          }
        }}
      >
        <View style={styles.iconWrapper}>
          {getNotificationIcon(item.type)}
        </View>

        <View style={styles.textContent}>
          <View style={styles.headerRow}>
            <Text style={[styles.notificationText, item.unread && styles.unreadText]}>
              {item.content}
            </Text>
            {item.unread && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notificationDescription}>
            {item.description}
          </Text>

          {item.type === 'permission' && (
            <View style={styles.permissionActions}>
              {item.requiresAction ? (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.denyButton]}
                    onPress={() => handlePermissionRequest(item)}
                  >
                    <Text style={styles.denyButtonText}>Deny</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.allowButton]}
                    onPress={() => handlePermissionRequest(item)}
                  >
                    <Text style={styles.allowButtonText}>Allow</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={[
                  styles.statusText,
                  item.status === 'accepted' ? styles.acceptedStatus : styles.declinedStatus
                ]}>
                  {item.status === 'accepted' ? 'Access Granted' : 'Access Denied'}
                </Text>
              )}
            </View>
          )}

          <Text style={styles.timeText}>{item.createdAt}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionsButton}
        onPress={() => handleOptionsPress(item.id)}
      >
        <Feather name="more-vertical" size={20} color="#888" />
      </TouchableOpacity>

      {showOptions === item.id && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => deleteNotification(item.id)}
          >
            <Feather name="trash-2" size={16} color="#F44336" style={styles.optionIcon} />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
          {item.unread && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => markNotificationAsRead(item.id)}
            >
              <Feather name="check" size={16} color="#4CAF50" style={styles.optionIcon} />
              <Text style={styles.optionText}>Mark as Read</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  const renderHeader = () => (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Notifications</Text> */}
        {selectedNotifications.length > 0 && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteSelectedNotifications}
          >
            <Feather name="trash-2" size={20} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'unread' && styles.activeFilter]}
          onPress={() => setFilterType('unread')}
        >
          <Text style={[styles.filterText, filterType === 'unread' && styles.activeFilterText]}>
            Unread
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'permissions' && styles.activeFilter]}
          onPress={() => setFilterType('permissions')}
        >
          <Text style={[styles.filterText, filterType === 'permissions' && styles.activeFilterText]}>
            Permissions
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderPermissionModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Permission Request</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {selectedPermission && (
            <View style={styles.modalContent}>
              <View style={styles.practitionerInfo}>
                <Image
                  source={{ uri: selectedPermission.practitioner.avatar }}
                  style={styles.practitionerAvatar}
                />
                <View style={styles.practitionerDetails}>
                  <Text style={styles.practitionerName}>
                    {selectedPermission.practitioner.name}
                  </Text>
                  <Text style={styles.practitionerSpecialty}>
                    {selectedPermission.practitioner.specialty}
                  </Text>
                  <Text style={styles.practitionerHospital}>
                    {selectedPermission.practitioner.hospital}
                  </Text>
                </View>
              </View>

              <View style={styles.permissionDetails}>
                <View style={styles.permissionItem}>
                  <Feather name="file-text" size={20} color="#2196F3" style={styles.permissionIcon} />
                  <Text style={styles.permissionText}>Medical History</Text>
                </View>
                <View style={styles.permissionItem}>
                  <Feather name="activity" size={20} color="#4CAF50" style={styles.permissionIcon} />
                  <Text style={styles.permissionText}>Lab Results</Text>
                </View>
                <View style={styles.permissionItem}>
                  <Feather name="clipboard" size={20} color="#FF9800" style={styles.permissionIcon} />
                  <Text style={styles.permissionText}>Prescription History</Text>
                </View>
              </View>

              <Text style={styles.permissionMessage}>
                Granting permission will allow {selectedPermission.practitioner.name} to access your health records for 30 days. You can revoke this permission at any time.
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.denyModalButton]}
                  onPress={() => respondToPermissionRequest(false)}
                >
                  <Text style={styles.denyModalButtonText}>Deny Access</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.allowModalButton]}
                  onPress={() => respondToPermissionRequest(true)}
                >
                  <Text style={styles.allowModalButtonText}>Grant Access</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderHeader()}

      {unreadNotifications && (
        <TouchableOpacity style={styles.markAsReadButton} onPress={markAllAsRead}>
          <Text style={styles.markAsReadText}>Mark All as Read</Text>
        </TouchableOpacity>
      )}

      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={NotificationsImg} style={styles.emptyImage} />
          <Text style={styles.emptyText}>You're all caught up</Text>
          <Text style={styles.emptyDescription}>There are no new notifications at the moment.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {renderPermissionModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  deleteButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeFilter: {
    backgroundColor: Colors.PRIMARY + '20',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
  },
  markAsReadButton: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
  },
  markAsReadText: {
    color: Colors.PRIMARY,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  unreadContainer: {
    backgroundColor: Colors.PRIMARY + '08',
    borderRadius: 10,
    borderBottomWidth: 0,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  selectIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  notificationContent: {
    flexDirection: 'row',
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 3,
  },
  notificationIcon: {
  },
  textContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.PRIMARY,
    marginLeft: 5,
  },
  notificationText: {
    fontSize: 15,
    color: Colors.SECONDARY,
    fontFamily: 'Poppins',
    flex: 1,
  },
  unreadText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
    marginTop: 5,
  },
  permissionActions: {
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginRight: 10,
  },
  denyButton: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  allowButton: {
    backgroundColor: Colors.PRIMARY,
  },
  denyButtonText: {
    color: '#666',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  allowButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  acceptedStatus: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  declinedStatus: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  optionsButton: {
    padding: 5,
  },
  optionsContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#eee',
    borderWidth: 1,
    width: 150,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'Poppins',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 20,
    color: Colors.SECONDARY,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 10,
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    padding: 20,
    maxHeight: screenHeight * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  modalContent: {
    marginBottom: 10,
  },
  practitionerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  practitionerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  practitionerDetails: {
    flex: 1,
  },
  practitionerName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
  },
  practitionerSpecialty: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: Colors.PRIMARY,
    marginTop: 2,
  },
  practitionerHospital: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
    marginTop: 2,
  },
  permissionDetails: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionIcon: {
    marginRight: 12,
  },
  permissionText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#444',
  },
  permissionMessage: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  denyModalButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  allowModalButton: {
    backgroundColor: Colors.PRIMARY,
    marginLeft: 10,
  },
  denyModalButtonText: {
    color: '#666',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  allowModalButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});