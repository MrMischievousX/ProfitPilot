import React, {useEffect} from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import {Platform, StatusBar} from 'react-native';
import {COLORS} from './src/constants/colors';

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.background);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  return <MainNavigation />;
}

export default App;
