import React, { useEffect } from 'react';
import { Text } from 'react-native';
import SplashScreen from "react-native-splash-screen";



const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <Text>chaitu</Text>
  );
};
export default App;