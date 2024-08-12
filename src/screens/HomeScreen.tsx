import React, {useEffect, useState} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON, STYLE} from '../constants/common';
import {window} from '../constants/layout';
import {useNavigation} from '@react-navigation/native';
import {CardProps, RootStackParamList} from '../types';
import {Ionicons} from '../components/VectorIcons';
import {ActionButton, Card, Header, TxnItem} from '../components';
import {cardData, txnData} from '../constants/data';
import useAppStore from '../store';
import Animated, {LinearTransition} from 'react-native-reanimated';

type props = StackScreenProps<RootStackParamList, 'homeScreenTab'>;

const HomeScreen = ({}: props) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inset = useSafeAreaInsets();

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
      backgroundColor: '#bcbcbc',
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
    loader: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
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
    Alert.alert('Amount Requested', '', [{text: 'OK'}]);
  };

  const handleTransferClick = () => {
    navigation.navigate('transferScreen');
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.lightBackground);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

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
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
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
            <View style={styles.addAction}>
              <Ionicons
                name={'add'}
                color={COLORS.white}
                size={COMMON.tabIcon}
              />
            </View>
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
