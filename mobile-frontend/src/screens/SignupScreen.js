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
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { signupStudent } from '../services/api';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    department: '',
    semester: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.department || !formData.semester) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const studentData = {
        ...formData,
        semester: parseInt(formData.semester, 10)
      };
      
      await signupStudent(studentData);
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const InputField = ({ icon, label, placeholder, value, onChangeText, keyboardType = 'default', autoCapitalize = 'none' }) => (
    <View style={styles.inputGroup}>
      <MaterialIcons name={icon} size={22} color="#A0AEC0" style={styles.inputIcon} />
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#CBD5E0"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Join the Portal</Text>
            <Text style={styles.subtitleText}>Fill in your details to get started</Text>

            <View style={styles.card}>
              <InputField 
                icon="person" 
                label="Full Name" 
                placeholder="e.g. John Doe" 
                value={formData.fullName} 
                onChangeText={(t) => updateField('fullName', t)} 
                autoCapitalize="words" 
              />
              
              <InputField 
                icon="phone" 
                label="Phone Number" 
                placeholder="e.g. 1234567890" 
                value={formData.phone} 
                onChangeText={(t) => updateField('phone', t)} 
                keyboardType="phone-pad" 
              />

              <InputField 
                icon="location-on" 
                label="Address" 
                placeholder="e.g. 123 Main St, City" 
                value={formData.address} 
                onChangeText={(t) => updateField('address', t)} 
              />

              <InputField 
                icon="business" 
                label="Department" 
                placeholder="e.g. Computer Science" 
                value={formData.department} 
                onChangeText={(t) => updateField('department', t)} 
                autoCapitalize="words" 
              />

              <InputField 
                icon="school" 
                label="Semester" 
                placeholder="e.g. 3" 
                value={formData.semester} 
                onChangeText={(t) => updateField('semester', t)} 
                keyboardType="numeric" 
              />

              <TouchableOpacity 
                style={styles.signupButton} 
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signupButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C51BF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  inputIcon: {
    marginRight: 15,
    marginLeft: 5,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  input: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
    padding: 0,
  },
  signupButton: {
    backgroundColor: '#4C51BF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#4C51BF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loginText: {
    color: '#718096',
    fontSize: 15,
  },
  loginLink: {
    color: '#4C51BF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
