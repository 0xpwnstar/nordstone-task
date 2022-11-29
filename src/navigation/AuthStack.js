import React from 'react';
import { createStackNavigator, DefaultTheme } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
            name='Login' component={LoginScreen} options={{ header: () => null }} 
            />
            <Stack.Screen 
            name='Signup' component={SignupScreen} options={{ header : () => null }}
            />
        </Stack.Navigator>
    );
}
