import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import PushNotification, {Importance} from 'react-native-push-notification';
import { windowHeight, windowWidth } from '../utils/Dimensions';



const handlePush = () => {
    PushNotification.localNotification({
        channelId: 'channel-id',
        autoCancel: true,
        bigText:'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'Expand me to see more',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]'
    })
}




export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Welcome user {user.uid}</Text>
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePush()} >
            <Text style={styles.buttonText} >Click Me!</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    buttonContainer: {
        marginTop: 10,
        width: windowWidth / 2,
        height: windowHeight / 13,
        backgroundColor: '#FF0000',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff'
    }
});