import React, { useEffect } from 'react';
import Providers from './src/navigation';
import SplashScreen from "react-native-splash-screen";

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', 
      channelName: 'My channel', 
      channelDescription: 'A channel to categorise your notifications', 
      playSound: true, 
      soundName: 'default',
      importance: Importance.HIGH, 
      vibrate: true, 
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <Providers />
  );
};
export default App;