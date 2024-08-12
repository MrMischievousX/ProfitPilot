import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON} from '../constants/common';
import {RootStackParamList} from '../types';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {cardData} from '../constants/data';
import CardItem from '../components/CardItem';
import {Header} from '../components';
import {Ionicons} from '../components/VectorIcons';
import {COLORS} from '../constants/colors';

type props = StackScreenProps<RootStackParamList, 'cardScreenTab'>;

const CardScreen = ({}: props) => {
  const inset = useSafeAreaInsets();

  const tabBarHeight = useBottomTabBarHeight();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafcfd',
      paddingTop: inset.top,
      gap: COMMON.mediumMargin,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: COMMON.mediumSpacing,
      paddingBottom: tabBarHeight * 2,
    },
    subHeading: {
      ...FONTS.subHeadingText,
      paddingVertical: COMMON.largeMargin,
    },
    content: {flex: 1},
    cardContainer: {gap: COMMON.largeSpacing, marginTop: COMMON.mediumMargin},
    addAction: {
      width: COMMON.largeIcon,
      height: COMMON.largeIcon,
      backgroundColor: COLORS.tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: COMMON.largeIcon,
      bottom: inset.bottom,
      position: 'absolute',
      right: COMMON.mediumSpacing,
    },
  });

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subHeading}>My Card</Text>
        <View style={styles.cardContainer}>
          {cardData.map((card, index) => {
            return <CardItem card={card} index={index} key={index} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.addAction}>
        <Ionicons name={'add'} color={COLORS.white} size={COMMON.tabIcon} />
      </View>
    </View>
  );
};

export default CardScreen;
