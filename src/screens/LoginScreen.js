import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider'


export default function LoginScreen({ navigation }) {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError ] = useState('');
    return (
        <View style={styles.container}>
            <Text style = {styles.text}>
                Welcome to Nordstone Task 
            </Text>
            <FormInput 
                value={email}
                placeholderText='Email'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />
            <FormInput
                value={password}
                placeholderText='Password'
                onChangeText={userPassword => setPassword(userPassword)}
                secureTextEntry={true}
            />
            {email && password &&
            <FormButton buttonTitle='Login' onPress={() =>
              login(email, password).then(res => res != "Ok" ? setError(res) : console.log("gg"))}
            />
            }
            <TouchableOpacity
                style={styles.text}
                onPress={()=>navigation.navigate('Signup')}
            >
              <Text style={styles.navButtonText}>New user? Join here</Text>
            </TouchableOpacity>
            <View>
        {
          error && <Text style={{color:'black', fontSize:28}}>
            Use a strong password!
            Format email correctly!
          </Text>
        }
        </View>


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
    marginBottom: 15
  },
  navButton: {
    marginTop: 15,
    marginBottom: 15
  },
  navButtonText: {
    fontSize: 22,
    marginTop: 15,
    color: '#6646ee',
    marginBottom: 15
  }
});