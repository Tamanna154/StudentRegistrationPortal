import axios from 'axios';

// Replace with your computer's local IP address or use 10.0.2.2 for Android Emulator
// e.g., const BASE_URL = 'http://192.168.1.5:8080';
// Using 10.0.2.2 as default for Android emulator testing against localhost.
const BASE_URL = 'http://10.144.237.83:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginStudent = async (fullName) => {
  try {
    const response = await api.post('/login', { fullName });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signupStudent = async (studentData) => {
  try {
    const response = await api.post('/signup', studentData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Fetch students error:', error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Update student error:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete student error:', error);
    throw error;
  }
};

export default api;
