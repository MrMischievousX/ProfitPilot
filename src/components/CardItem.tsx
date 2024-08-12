import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardLine, Nfc, Visa} from '../assets/svg';
import {FONTS} from '../constants/fonts';
import {CardProps} from '../types';
import {COLORS} from '../constants/colors';
import {COMMON, STYLE} from '../constants/common';

const CARDCOLORS = ['#87dcfb', 'lightgrey', '#bedcc0'];
const LINECOLORS = ['#446e7e', 'grey', '#5f6e60'];

interface props {
  index: number;
  card: CardProps;
}

const CardItem = ({card, index}: props) => {
  const {cardNumber, date} = card;

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 224,
      borderRadius: COMMON.largeSpacing,
      borderWidth: 1,
      borderColor: COLORS.lightGrey,
      ...STYLE.lightShadow,
    },
    cardStart: {
      height: '50%',
      borderTopLeftRadius: COMMON.largeSpacing,
      borderTopRightRadius: COMMON.largeSpacing,
      backgroundColor: CARDCOLORS[index % CARDCOLORS.length],
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: COMMON.pageSpacing,
      paddingTop: COMMON.mediumSpacing,
      paddingHorizontal: COMMON.largeSpacing,
      overflow: 'hidden',
    },
    cardEnd: {
      height: '50%',
      borderBottomLeftRadius: COMMON.largeSpacing,
      borderBottomRightRadius: COMMON.largeSpacing,
      backgroundColor: COLORS.white,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: COMMON.largeSpacing,
    },
    cardLine: {position: 'absolute', transform: [{scale: 2}]},
    cardNumberContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cardNumber: {...FONTS.subHeadingText, fontSize: 28},
    nameContainer: {gap: COMMON.smallMargin},
    bold: {fontWeight: '500'},
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardStart}>
        <CardLine
          style={styles.cardLine}
          stroke={LINECOLORS[index % CARDCOLORS.length]}
        />
        <Nfc width={COMMON.tabIcon} height={COMMON.tabIcon} />
        <View style={styles.cardNumberContainer}>
          {cardNumber.split(' ').map((number, ind) => {
            return (
              <Text style={styles.cardNumber} key={ind}>
                {number}
              </Text>
            );
          })}
        </View>
      </View>
      <View style={styles.cardEnd}>
        <View style={styles.nameContainer}>
          <Text style={{...FONTS.primaryTextBold, color: COLORS.tertiary}}>
            Sarah Muller
          </Text>
          <Text style={{...FONTS.primaryText, color: COLORS.tertiary}}>
            Exp <Text style={styles.bold}>{date}</Text>
          </Text>
        </View>
        <Visa
          width={COMMON.mediumMargin * 11}
          height={COMMON.mediumMargin * 11}
        />
      </View>
    </View>
  );
};

export default CardItem;
