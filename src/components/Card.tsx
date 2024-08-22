import React, {useState} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {window} from '../constants/layout';
import {COLORS} from '../constants/colors';
import {COMMON} from '../constants/common';
import {UsFlag, Visa} from '../assets/svg';
import {BlurView} from '@react-native-community/blur';
import {Feather} from './VectorIcons';
import {CardProps} from '../types';
import currency from 'currency.js';
import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';
import {FONTS} from '../constants/fonts';
import {TouchableRipple} from 'react-native-paper';
import {CARDCOLORS} from '../constants/data';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface props {
  index?: number;
  card: CardProps;
  onPress?: (event: GestureResponderEvent) => void;
  isInStats?: boolean;
}

export const Card = ({index = 0, card, onPress, isInStats}: props) => {
  const {balance, cardNumber, date} = card;

  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const styles = StyleSheet.create({
    container: {
      width: isInStats ? window.width - COMMON.tabIcon : window.width * 0.8,
      height: isInStats ? 248 : 264,
      backgroundColor: isInStats
        ? COLORS.white
        : CARDCOLORS[index % CARDCOLORS.length],
      borderRadius: COMMON.cardRadius,
      padding: COMMON.xxlMargin,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btn: {
      backgroundColor: isInStats
        ? COLORS.background
        : 'rgba(255, 255, 255, 0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: COMMON.largeSpacing,
      overflow: 'hidden',
      paddingLeft: COMMON.mediumMargin,
      paddingRight: COMMON.mediumSpacing,
      paddingVertical: COMMON.btnPadding,
      gap: COMMON.mediumMargin,
    },
    flagIcon: {
      width: COMMON.bottomIcon,
      height: COMMON.bottomIcon,
      borderRadius: COMMON.bottomIcon,
      overflow: 'hidden',
    },
    balance: {
      ...FONTS.primaryText,
      color: isInStats ? COLORS.grey : COLORS.white,
    },
    balanceContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balanceAmount: {...FONTS.tertiaryText, width: '80%'},
    eye: {
      width: COMMON.mediumIcon,
      height: COMMON.mediumIcon,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: COMMON.mediumIcon / 2,
      borderWidth: COMMON.borderWidth,
      borderColor: 'white',
      overflow: 'hidden',
    },
    iconContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    eyeContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: isInStats ? 'white' : 'rgba(255, 255, 255, 0.15)',
    },
    descContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    space: {gap: COMMON.smallMargin},
    descHeading: {
      ...FONTS.bodyText,
      color: isInStats ? COLORS.grey : COLORS.white,
    },
    descSubHeading: {...FONTS.primaryTextBold, color: COLORS.tertiary},
    currency: {...FONTS.bodyTextBold, color: COLORS.tertiary},
  });

  return (
    <AnimatedPressable
      entering={
        isInStats
          ? FadeIn.duration(500)
          : FadeInUp.delay(index * 300).duration(500)
      }
      exiting={FadeInDown}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btn}>
          <View style={styles.flagIcon}>
            <UsFlag width={COMMON.flagSize} height={COMMON.flagSize} />
          </View>
          <Text style={styles.currency}>US Dollar</Text>
        </View>
        <Visa width={COMMON.mediumIcon} height={COMMON.mediumIcon} />
      </View>
      <View>
        <Text style={styles.balance}>Your Balance</Text>
        <View style={styles.balanceContent}>
          <Text style={styles.balanceAmount} numberOfLines={1}>
            {isBalanceHidden ? '$XX.XX' : currency(balance).format()}
          </Text>
          <TouchableRipple
            onPress={() => setIsBalanceHidden(!isBalanceHidden)}
            style={styles.eye}>
            <BlurView
              blurType="light"
              blurAmount={32}
              blurRadius={25}
              style={styles.eyeContainer}>
              <View style={styles.iconContainer}>
                <Feather
                  name={isBalanceHidden ? 'eye-off' : 'eye'}
                  color={isInStats ? COLORS.greyText : COLORS.white}
                  size={COMMON.tabIcon}
                />
              </View>
            </BlurView>
          </TouchableRipple>
        </View>
      </View>
      <View style={styles.descContainer}>
        <View style={styles.space}>
          <Text style={styles.descHeading}>Account Number</Text>
          <Text style={styles.descSubHeading}>
            **** {cardNumber.substring(cardNumber.length - 4)}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.descHeading}>Valid Thru</Text>
          <Text style={styles.descSubHeading}>{date}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default Card;
