import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { loginStudent } from '../services/api';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginStudent(fullName);
      if (response === 'LOGIN_SUCCESS') {
        navigation.replace('Dashboard', { studentName: fullName });
      } else {
        Alert.alert('Login Failed', 'User not found. Please sign up.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.topSection}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="school" size={60} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to your student portal</Text>
      </View>
      
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <MaterialIcons name="person" size={24} color="#A0AEC0" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. John Doe"
                placeholderTextColor="#CBD5E0"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C51BF', // Primary brand color
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#EBF4FF',
    opacity: 0.9,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#F0F4F8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 50,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  inputIcon: {
    marginRight: 15,
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
  loginButton: {
    backgroundColor: '#4C51BF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#4C51BF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#718096',
    fontSize: 15,
  },
  signupLink: {
    color: '#4C51BF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
