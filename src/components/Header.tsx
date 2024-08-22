import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Feather} from './VectorIcons';
import {COMMON} from '../constants/common';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {useToast} from 'react-native-toast-notifications';
import {userImage} from '../constants/data';

const Header = () => {
  const toast = useToast();

  const styles = StyleSheet.create({
    header: {
      height: COMMON.buttonHeight,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: COMMON.mediumSpacing,
    },
    headerIconContainer: {
      flexDirection: 'row',
      gap: COMMON.mediumMargin,
    },
    icon: {
      width: COMMON.iconSize,
      height: COMMON.iconSize,
      borderRadius: COMMON.iconSize,
    },
    headerContent: {justifyContent: 'center', gap: COMMON.smallMargin},
    userName: {...FONTS.secondaryTextBold, color: COLORS.tertiary},
    dot: {
      width: COMMON.mediumMargin,
      height: COMMON.mediumMargin,
      borderRadius: COMMON.mediumMargin,
      backgroundColor: COLORS.success,
      position: 'absolute',
      right: COMMON.smallMargin,
    },
    body: {
      ...FONTS.bodyText,
    },
    notification: {position: 'relative'},
  });

  const handleNotificationPress = () => {
    toast.show('Feature in progress!');
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerIconContainer}>
        <Image style={styles.icon} source={{uri: userImage}} />
        <View style={styles.headerContent}>
          <Text style={styles.body}>Welcome back,</Text>
          <Text style={styles.userName}>Sarah Muller</Text>
        </View>
      </View>
      <View style={styles.notification}>
        <Feather
          onPress={handleNotificationPress}
          name={'bell'}
          color={COLORS.tertiary}
          size={COMMON.tabIcon}
        />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default Header;
