import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {FONTS} from '../constants/fonts';
import {COMMON} from '../constants/common';
import {COLORS} from '../constants/colors';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';

const Toast = (toast: ToastProps) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: COMMON.borderWidth,
      flexDirection: 'row',
      backgroundColor: COLORS.tertiary,
      flex: 1,
      marginBottom: COMMON.mediumMargin,
      paddingVertical: COMMON.pageMargin,
      paddingHorizontal: COMMON.largeMargin,
    },
    message: {
      ...FONTS.bodyText,
      color: COLORS.white,
      marginHorizontal: COMMON.largeMargin,
      width: '75%',
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>{toast.message}</Text>
        <Button mode="text" onPress={toast.onHide} textColor={COLORS.primary}>
          OK
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Toast;
