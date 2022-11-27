import React, { useEffect } from 'react';
import Providers from './src/navigation';
import SplashScreen from "react-native-splash-screen";



const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <Providers />
  );
};
export default App;