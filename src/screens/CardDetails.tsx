import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON, STYLE} from '../constants/common';
import {RootStackParamList} from '../types';
import {Card} from '../components';
import {MaterialIcons, Octicons} from '../components/VectorIcons';
import {FONTS} from '../constants/fonts';
import {TouchableRipple} from 'react-native-paper';
import {window} from '../constants/layout';
import CustomChart from '../components/CustomChart';

type props = StackScreenProps<RootStackParamList, 'cardDetails'>;

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

const CardDetails = ({route, navigation}: props) => {
  const cardDetails = route.params?.cardDetails;

  const [currentIndex, setCurrentIndex] = useState(0);

  const inset = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: inset.top,
      paddingHorizontal: COMMON.mediumSpacing,
    },
    header: {
      height: COMMON.mediumMargin * 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: COMMON.largeMargin,
      width: '100%',
    },
    backIcon: {position: 'absolute', left: 0},
    title: {...FONTS.primaryTextBold, color: COLORS.tertiary},
    monthContainer: {
      width: window.width - COMMON.tabIcon,
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      justifyContent: 'space-between',
      paddingHorizontal: COMMON.smallMargin,
      paddingVertical: COMMON.smallMargin,
      borderRadius: COMMON.largeMargin * 4,
      marginTop: COMMON.mediumSpacing,
    },
    monthBtn: {
      width: COMMON.largeMargin * 4,
      height: COMMON.largeMargin * 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: COMMON.largeMargin * 2,
      overflow: 'hidden',
    },
    chartContainer: {
      width: '100%',
      backgroundColor: COLORS.white,
      marginTop: COMMON.mediumSpacing,
      borderRadius: COMMON.cardRadius,
      borderWidth: 1,
      borderColor: '#e1e1e1',
      justifyContent: 'space-between',
      ...STYLE.lightShadow,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: COMMON.largeMargin,
      paddingTop: COMMON.largeMargin,
    },
    weekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: COMMON.mediumSpacing,
      paddingBottom: COMMON.mediumSpacing,
    },
    btn: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
      paddingHorizontal: COMMON.mediumSpacing,
      paddingVertical: 10,
      borderRadius: COMMON.largeSpacing,
      justifyContent: 'center',
      alignItems: 'center',
      gap: COMMON.mediumMargin,
    },
    txnText: {
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: -0.2,
      color: COLORS.tertiary,
    },
    btnText: {
      ...FONTS.bodyTextBold,
      letterSpacing: -0.2,
      color: COLORS.tertiary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          onPress={navigation.goBack}
          name={'keyboard-backspace'}
          color={COLORS.tertiary}
          size={COMMON.tabIcon}
          style={styles.backIcon}
        />
        <Text style={styles.title}>Statistic</Text>
      </View>
      <Card card={cardDetails} isInStats />
      <View style={styles.monthContainer}>
        {MONTHS.map((month, index) => {
          return (
            <TouchableRipple
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={[
                styles.monthBtn,
                {
                  backgroundColor:
                    index === currentIndex ? COLORS.primary : COLORS.white,
                },
              ]}>
              <Text
                style={{
                  ...FONTS.bodyText,
                  color:
                    index === currentIndex ? COLORS.tertiary : COLORS.greyText,
                }}>
                {month}
              </Text>
            </TouchableRipple>
          );
        })}
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.txnText}>Transaction</Text>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Earnings</Text>
            <Octicons name={'chevron-down'} color={COLORS.grey} size={20} />
          </View>
        </View>
        <>
          <CustomChart />
          <View style={styles.weekContainer}>
            {WEEKS.map((month, index) => {
              return (
                <Text style={FONTS.bodyText} key={index}>
                  {month}
                </Text>
              );
            })}
          </View>
        </>
      </View>
    </View>
  );
};

export default CardDetails;
