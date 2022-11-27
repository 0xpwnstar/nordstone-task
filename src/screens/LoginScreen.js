import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider'


export default function LoginScreen({ navigation }) {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Text style = {styles.text}>
                Welcome to firebase app
            </Text>
            <FormInput 
                value={email}
                placeholderText='Email'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  }
});