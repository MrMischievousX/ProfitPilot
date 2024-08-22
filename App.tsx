import React, {useEffect} from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {COLORS} from './src/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {MagicSheetPortal} from 'react-native-magic-sheet';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Toast} from './src/components';
import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.transparent);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: COLORS.background},
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ToastProvider
          placement="top"
          animationDuration={100}
          type="normal"
          offset={0}
          renderType={{
            normal: toast => <Toast {...toast} />,
          }}>
          <BottomSheetModalProvider>
            <MagicSheetPortal />
            <MainNavigation />
          </BottomSheetModalProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
