import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getStudents } from '../services/api';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ route, navigation }) => {
  const { studentName } = route?.params || {};
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudentData = async () => {
    try {
      const data = await getStudents();
      if (studentName) {
        const found = data.find(s => s.fullName.toLowerCase() === studentName.toLowerCase());
        setStudent(found || null);
      } else {
        // Fallback for testing if no name passed
        setStudent(data.length > 0 ? data[data.length - 1] : null);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudentData();
    }, [studentName])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStudentData();
  }, [studentName]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0B1120" />
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0B1120" />
        <MaterialIcons name="person-off" size={64} color="#334155" />
        <Text style={styles.emptyText}>Profile not found</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutBtnText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Dynamic courses based on student's semester
  const getCoursesForSemester = (sem) => {
    switch(sem) {
      case 1: return ['Mathematics I', 'Physics', 'Basic Programming'];
      case 2: return ['Mathematics II', 'Data Structures', 'Digital Logic'];
      case 3: return ['Algorithms', 'Computer Organization', 'Web Technologies'];
      case 4: return ['Operating System', 'Database Management', 'Computer Networks'];
      case 5: return ['Software Engineering', 'Machine Learning', 'Cloud Computing'];
      case 6: return ['Artificial Intelligence', 'Cyber Security', 'Compiler Design'];
      case 7: return ['Distributed Systems', 'Blockchain Technology', 'Data Science'];
      case 8: return ['Major Project', 'Industrial Training', 'Ethics in Engineering'];
      default: return ['Advanced Topics', 'Elective Subject', 'Seminar'];
    }
  };
  
  const mockCourses = getCoursesForSemester(student.semester);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1120" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Dashboard</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38BDF8" />
        }
      >
        {/* PROFILE CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <FontAwesome5 name="user-alt" size={16} color="#C084FC" />
            </View>
            <Text style={styles.cardTitle}>Profile</Text>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="thumbtack" size={16} color="#F43F5E" style={styles.infoIcon} />
              <Text style={styles.infoText}>{student.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="phone-alt" size={16} color="#EC4899" style={styles.infoIcon} />
              <Text style={styles.infoText}>{student.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="home" size={16} color="#F97316" style={styles.infoIcon} />
              <Text style={styles.infoText}>{student.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="graduation-cap" size={14} color="#8B5CF6" style={styles.infoIcon} />
              <Text style={styles.infoText}>{student.department}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="hourglass-half" size={16} color="#EAB308" style={styles.infoIcon} />
              <Text style={styles.infoText}>Semester: {student.semester}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* COURSES CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="layers" size={18} color="#10B981" />
            </View>
            <Text style={styles.cardTitle}>Courses</Text>
          </View>

          <View style={styles.coursesList}>
            {mockCourses.map((course, idx) => (
              <View key={idx} style={styles.courseItem}>
                <Text style={styles.courseText}>{course}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* QUICK STATS CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="stats-chart" size={16} color="#14B8A6" />
            </View>
            <Text style={styles.cardTitle}>Quick Stats</Text>
          </View>

          <View style={styles.statsList}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Courses</Text>
              <Text style={styles.statValue}>{mockCourses.length}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Current Semester</Text>
              <Text style={styles.statValue}>{student.semester}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Attendance</Text>
              <Text style={styles.statValue}>92%</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38BDF8',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
    ...(Platform.OS === 'web' ? {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    } : {}),
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    ...(Platform.OS === 'web' ? {
      width: width > 1000 ? '30%' : width > 768 ? '45%' : '100%',
      marginHorizontal: 10,
    } : {}),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E2E8F0',
    letterSpacing: 0.5,
  },
  infoList: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    width: 24,
    textAlign: 'center',
    marginRight: 15,
  },
  infoText: {
    fontSize: 15,
    color: '#CBD5E1',
    fontWeight: '500',
    flex: 1,
  },
  logoutButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
  },
  logoutText: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coursesList: {
    marginTop: 5,
  },
  courseItem: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  courseText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '500',
  },
  statsList: {
    marginTop: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '500',
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#94A3B8',
    marginTop: 20,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#0B1120',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default DashboardScreen;
