import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import EditStudentScreen from './src/screens/EditStudentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f5f7fa' }
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{
              headerShown: true,
              title: '',
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#f5f7fa' }
            }}
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen 
            name="EditStudent" 
            component={EditStudentScreen} 
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
