import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON, STYLE} from '../constants/common';
import {RootStackParamList, YearlyChartData} from '../types';
import {Card, CustomChart, Loader} from '../components';
import {MaterialIcons, Octicons} from '../components/VectorIcons';
import {FONTS} from '../constants/fonts';
import {TouchableRipple} from 'react-native-paper';
import {MONTHS, WEEKS} from '../constants/data';

type props = StackScreenProps<RootStackParamList, 'cardDetails'>;

const CardDetails = ({route, navigation}: props) => {
  const cardDetails = route.params?.cardDetails;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentMonth, setCurrentMonth] = useState<string>(MONTHS[0]);
  const [chartData, setChartData] = useState<YearlyChartData | null>(null);

  const generateYearlyChartData = () => {
    const data: YearlyChartData = {};

    MONTHS.forEach((month, index) => {
      const daysInMonth = new Date(2024, index + 1, 0).getDate();
      data[month] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const timestamp = new Date(2024, index, day).getTime();
        const value = Math.floor(Math.random() * 50 + 10);

        data[month].push({timestamp, value});
      }
    });

    setChartData(data);
    setIsLoading(false);
  };

  const inset = useSafeAreaInsets();

  React.useEffect(() => {
    generateYearlyChartData();
  }, []);

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
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      paddingVertical: COMMON.smallMargin,
    },
    monthBox: {
      marginTop: COMMON.mediumSpacing,
      borderRadius: COMMON.largeMargin * 4,
      overflow: 'hidden',
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
      borderWidth: COMMON.borderWidth,
      borderColor: COLORS.lightGrey,
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
    monthContentContainer: {
      justifyContent: 'space-between',
      paddingHorizontal: COMMON.smallMargin,
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card card={cardDetails} isInStats />
          <View style={styles.monthBox}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.monthContainer}
              horizontal
              contentContainerStyle={styles.monthContentContainer}>
              {MONTHS.map((month, index) => {
                return (
                  <TouchableRipple
                    key={index}
                    onPress={() => setCurrentMonth(month)}
                    style={[
                      styles.monthBtn,
                      {
                        backgroundColor:
                          month === currentMonth
                            ? COLORS.primary
                            : COLORS.white,
                      },
                    ]}>
                    <Text
                      style={{
                        ...FONTS.bodyText,
                        color:
                          month === currentMonth
                            ? COLORS.tertiary
                            : COLORS.greyText,
                      }}>
                      {month}
                    </Text>
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.txnText}>Transaction</Text>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Earnings</Text>
                <Octicons
                  name={'chevron-down'}
                  color={COLORS.grey}
                  size={COMMON.xxlMargin}
                />
              </View>
            </View>
            <>
              {chartData && (
                <CustomChart
                  chartData={chartData[currentMonth as keyof typeof chartData]}
                />
              )}
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
        </>
      )}
    </View>
  );
};

export default CardDetails;
