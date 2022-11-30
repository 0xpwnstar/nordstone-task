import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/ImageScreen';
import TextScreen from '../screens/TextScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  CalculatorScreen  from '../screens/CalculatorScreen';
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} options={{ header: () => null }} />
        <Tab.Screen name='Image' component={UploadScreen} options={{header: () => null }} />
        <Tab.Screen name='Text' component={TextScreen} options={{header: () => null }} />
        <Tab.Screen name='Calc' component={CalculatorScreen} options={{header: () => null }} />
    </Tab.Navigator>
  );
}