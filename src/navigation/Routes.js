import React, {useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AuthContext from './AuthProvider';



export default function Routes() {
    return (
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
}