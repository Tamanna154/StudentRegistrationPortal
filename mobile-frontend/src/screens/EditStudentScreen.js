import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { updateStudent } from '../services/api';

const EditStudentScreen = ({ route, navigation }) => {
  const { student } = route.params;

  const [formData, setFormData] = useState({
    fullName: student.fullName,
    phone: student.phone,
    address: student.address,
    department: student.department,
    semester: student.semester.toString()
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.department || !formData.semester) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        ...formData,
        semester: parseInt(formData.semester, 10)
      };
      
      await updateStudent(student.studentId, updatedData);
      Alert.alert('Success', 'Student details updated successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Dashboard', { studentName: updatedData.fullName }) }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Student</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <MaterialIcons name="person" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChangeText={(text) => updateField('fullName', text)}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="phone" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1234567890"
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="location-on" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 123 Main St"
                value={formData.address}
                onChangeText={(text) => updateField('address', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="business" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Department</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChangeText={(text) => updateField('department', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <MaterialIcons name="school" size={20} color="#7f8c8d" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Semester</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 3"
                value={formData.semester}
                onChangeText={(text) => updateField('semester', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.updateButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 25,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    paddingBottom: 15,
  },
  inputIcon: {
    marginTop: 30,
    marginRight: 15,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#A0AEC0',
    marginBottom: 5,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  input: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
    paddingVertical: 5,
  },
  updateButton: {
    backgroundColor: '#4C51BF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#4C51BF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditStudentScreen;
