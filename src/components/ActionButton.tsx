import React from 'react';
import {GestureResponderEvent, StyleSheet, Text} from 'react-native';
import {COMMON, STYLE} from '../constants/common';
import {FONTS} from '../constants/fonts';
import {COLORS} from '../constants/colors';
import {Feather} from './VectorIcons';
import {TouchableRipple} from 'react-native-paper';

interface props {
  title: string;
  icon: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const ActionButton = ({title, icon, onPress}: props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: COMMON.mediumSpacing,
      borderRadius: COMMON.buttonHeight,
      minHeight: COMMON.buttonHeight,
      gap: COMMON.smallMargin,
      overflow: 'hidden',
      ...STYLE.shadow,
    },
    title: {
      ...FONTS.primaryTextBold,
      color: COLORS.tertiary,
    },
  });

  return (
    <TouchableRipple onPress={onPress} style={styles.container}>
      <>
        <Feather name={icon} color={COLORS.tertiary} size={COMMON.tabIcon} />
        <Text style={styles.title}>{title}</Text>
      </>
    </TouchableRipple>
  );
};

export default ActionButton;
