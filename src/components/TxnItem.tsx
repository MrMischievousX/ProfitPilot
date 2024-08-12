import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COMMON} from '../constants/common';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {Feather} from './VectorIcons';
import {TxnProps} from '../types';
import currency from 'currency.js';
import dayjs from 'dayjs';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import {window} from '../constants/layout';

interface props {
  txn: TxnProps;
  index: number;
}

const TxnItem = ({txn, index}: props) => {
  const {amount, name, time, type} = txn;

  const isReceived = type === 'RECEIVE';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: COMMON.mediumMargin,
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: window.width - COMMON.mediumMargin * 11,
    },
    iconContainer: {
      width: COMMON.iconSize,
      height: COMMON.iconSize,
      backgroundColor: COLORS.lightGrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: COMMON.iconSize,
    },
    heading: {
      ...FONTS.primaryTextBold,
      color: COLORS.tertiary,
    },
    subHeading: {...FONTS.bodyText},
    contentContainer: {
      gap: COMMON.smallMargin,
      width: '70%',
    },
    amountContainer: {
      flexDirection: 'row',
      gap: 2,
      width: '30%',
      justifyContent: 'flex-end',
    },
    amount: {...FONTS.bodyTextBold, color: COLORS.tertiary},
  });

  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 200).duration(500)}
      style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather
          name={'arrow-up-right'}
          color={COLORS.grey}
          size={COMMON.tabIcon}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading} numberOfLines={1}>
            {isReceived ? 'Received from' : 'Transfer to'} {name}
          </Text>
          <Text style={styles.subHeading}>{dayjs(time).format('HH:mm A')}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              {color: isReceived ? COLORS.success : COLORS.error},
            ]}>
            {isReceived ? '+' : '-'}
          </Text>
          <Text style={[styles.amount]}>{currency(amount).format()}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default TxnItem;
