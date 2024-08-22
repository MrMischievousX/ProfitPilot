import React, {useEffect, useState} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON, STYLE} from '../constants/common';
import {window} from '../constants/layout';
import {useNavigation} from '@react-navigation/native';
import {CardProps, RootStackParamList} from '../types';
import {Ionicons} from '../components/VectorIcons';
import {
  ActionButton,
  AddCard,
  Card,
  Header,
  Loader,
  TransferMoney,
  TxnItem,
} from '../components';
import {cardData, txnData} from '../constants/data';
import useAppStore from '../store';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {magicSheet} from 'react-native-magic-sheet';
import {TouchableRipple} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';

type props = StackScreenProps<RootStackParamList, 'homeScreenTab'>;

const HomeScreen = ({}: props) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inset = useSafeAreaInsets();
  const toast = useToast();

  const {cards, txns, addCards, addTxns} = useAppStore();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightBackground,
      paddingTop: inset.top,
      gap: COMMON.mediumMargin,
    },
    subHeading: {
      ...FONTS.subHeadingText,
    },
    body: {
      ...FONTS.bodyText,
    },
    scrollContent: {
      gap: COMMON.mediumMargin,
      flexGrow: 1,
      paddingHorizontal: COMMON.mediumSpacing,
      marginTop: COMMON.largeMargin,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: COMMON.largeMargin,
      alignItems: 'center',
      ...STYLE.shadow,
      shadowRadius: 200,
    },
    addAction: {
      width: COMMON.largeIcon,
      height: COMMON.largeIcon,
      backgroundColor: COLORS.tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: COMMON.largeIcon,
      overflow: 'hidden',
    },
    txnContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: COMMON.mediumSpacing,
      borderTopStartRadius: COMMON.mediumSpacing,
      borderTopEndRadius: COMMON.mediumSpacing,
      width: window.width,
      left: -COMMON.mediumSpacing,
      paddingHorizontal: COMMON.mediumSpacing,
      marginTop: COMMON.mediumSpacing,
      paddingBottom: COMMON.mediumSpacing * 8,
    },
    txnHandle: {
      width: COMMON.tabIcon,
      height: COMMON.smallMargin,
      backgroundColor: COLORS.sheetHandle,
      alignSelf: 'center',
      borderRadius: COMMON.tabIcon,
    },
    txnHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: COMMON.largeMargin,
    },
    txnContent: {marginTop: COMMON.largeMargin},
    txns: {gap: COMMON.mediumSpacing, marginTop: COMMON.mediumSpacing},
    scrollContainer: {flex: 1},
    listContent: {gap: COMMON.mediumSpacing},
    bottomSheet: {
      paddingBottom: COMMON.largeMargin,
      height: window.height * 0.8,
    },
  });

  const renderItem = React.useCallback(
    ({item, index}: {item: CardProps; index: number}) => {
      const handleCardPress = () => {
        navigation.navigate('cardDetails', {cardDetails: item});
      };
      return <Card card={item} index={index} onPress={handleCardPress} />;
    },
    [navigation],
  );

  const handleRequestClick = () => {
    toast.show('Amount Requested');
  };

  const handleTransferClick = () => {
    magicSheet.show(
      () => {
        return (
          <BottomSheetView style={styles.bottomSheet}>
            <TransferMoney />
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

  useEffect(() => {
    (() => {
      if (cards.length <= 0) {
        addCards(cardData);
      }
      if (txns.length <= 0) {
        addTxns(txnData);
      }
      setIsLoading(false);
    })();
  }, [addCards, addTxns, cards.length, txns.length]);

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          <Text style={styles.subHeading}>Account</Text>
          <Animated.FlatList
            itemLayoutAnimation={LinearTransition.duration(0)}
            style={{marginTop: COMMON.mediumMargin}}
            data={cards}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToInterval={window.width * 0.8 + 16}
            decelerationRate="fast"
            overScrollMode={'never'}
            snapToAlignment="start"
            contentContainerStyle={styles.listContent}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.actionContainer}>
            <ActionButton
              title="Request"
              icon="arrow-down-left"
              onPress={handleRequestClick}
            />
            <ActionButton
              title="Transfer"
              icon="arrow-up-right"
              onPress={handleTransferClick}
            />
            <TouchableRipple style={styles.addAction} onPress={handleAddCard}>
              <Ionicons
                name={'add'}
                color={COLORS.white}
                size={COMMON.tabIcon}
              />
            </TouchableRipple>
          </View>
          <View style={styles.txnContainer}>
            <View style={styles.txnHandle} />
            <View style={styles.txnHeader}>
              <Text style={styles.subHeading}>Transaction</Text>
              <Text style={styles.body}>View all</Text>
            </View>
            <View style={styles.txnContent}>
              <Text style={styles.body}>TODAY</Text>
              <View style={styles.txns}>
                {txns.reverse().map((txn, index) => {
                  return <TxnItem key={index} txn={txn} index={index} />;
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
