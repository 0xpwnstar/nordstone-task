import React, {useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';
import HomeStack from './HomeStack';


export default function Routes() {
    const {user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    function listener(user) {
        setUser(user); 
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(listener);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if (loading) {
        return ;
    }

    return (
        <NavigationContainer>
            {user ? <HomeStack/>:<AuthStack/>}
        </NavigationContainer>
    )
}