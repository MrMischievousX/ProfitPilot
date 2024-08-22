import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON} from '../constants/common';
import {RootStackParamList} from '../types';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {AddCard, CardItem, Header} from '../components';
import {COLORS} from '../constants/colors';
import useAppStore from '../store';
import {magicSheet} from 'react-native-magic-sheet';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {TouchableRipple} from 'react-native-paper';
import {window} from '../constants/layout';
import {Ionicons} from '../components/VectorIcons';

type props = StackScreenProps<RootStackParamList, 'cardScreenTab'>;

const CardScreen = ({navigation}: props) => {
  const inset = useSafeAreaInsets();
  const {cards} = useAppStore();

  const tabBarHeight = useBottomTabBarHeight();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightBackground,
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
      overflow: 'hidden',
    },
    bottomSheet: {
      paddingBottom: COMMON.largeMargin,
      height: window.height * 0.8,
    },
  });

  const handleAddCard = () => {
    magicSheet.show(
      () => {
        return (
          <BottomSheetView style={styles.bottomSheet}>
            <AddCard />
          </BottomSheetView>
        );
      },
      {
        enableDynamicSizing: true,
        snapPoints: null as any,
        enableOverDrag: false,
      },
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subHeading}>My Card</Text>
        <View style={styles.cardContainer}>
          {cards.map((card, index) => {
            const handleCardPress = () => {
              navigation.navigate('cardDetails', {cardDetails: card});
            };

            return (
              <CardItem
                handleCardPress={handleCardPress}
                card={card}
                index={index}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
      <TouchableRipple onPress={handleAddCard} style={styles.addAction}>
        <Ionicons name={'add'} color={COLORS.white} size={COMMON.tabIcon} />
      </TouchableRipple>
    </View>
  );
};

export default CardScreen;
