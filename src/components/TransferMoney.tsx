import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FONTS} from '../constants/fonts';
import {COMMON} from '../constants/common';
import {CardProps, TxnProps} from '../types';
import {COLORS} from '../constants/colors';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import useAppStore from '../store';
import {Ionicons} from './VectorIcons';
import {magicSheet} from 'react-native-magic-sheet';
import {useToast} from 'react-native-toast-notifications';
import currency from 'currency.js';

interface props {}

const TransferMoney = ({}: props) => {
  const {cards, txns, addTxn, updateCard} = useAppStore();
  const toast = useToast();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [choosenCard, setChoosenCard] = useState<CardProps | null>(null);
  const [canChooseCard, setCanChooseCard] = useState(false);
  const [errorMsg, setErrorMsg] = useState({msg: '', index: -1});
  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightBackground,
      paddingHorizontal: COMMON.pageSpacing,
      justifyContent: 'space-between',
      marginBottom: COMMON.largeMargin,
    },
    input: {
      marginTop: COMMON.pageSpacing,
    },
    subHeading: {
      ...FONTS.subHeadingText,
    },
    btnStyle: {
      borderRadius: COMMON.mediumMargin * 2,
    },
    chooseCardContainer: {
      borderWidth: COMMON.borderWidth,
      borderColor: COLORS.grey,
      borderRadius: COMMON.mediumMargin,
      overflow: 'hidden',
      marginTop: COMMON.smallMargin,
    },
    card: {
      height: COMMON.mediumIcon,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: COMMON.mediumMargin,
      borderColor: COLORS.grey,
    },
    cardText: {
      ...FONTS.bodyText,
      color: COLORS.tertiary,
    },
    error: {
      ...FONTS.bodyText,
      color: COLORS.error,
      marginTop: COMMON.smallMargin,
    },
    balanceText: {
      ...FONTS.bodyTextBold,
      marginTop: COMMON.smallMargin,
    },
  });

  const handlePress = () => {
    setErrorMsg({msg: '', index: -1});
    setIsLoading(true);

    if (!name || name.length <= 2) {
      setErrorMsg({msg: 'Please enter recipient name', index: 0});
      setIsLoading(false);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMsg({msg: 'Please enter a valid amount', index: 1});
      setIsLoading(false);
      return;
    }

    if (!choosenCard) {
      setErrorMsg({msg: 'Please choose a payment card', index: 2});
      setIsLoading(false);
      return;
    }

    const filteredCard = cards.filter(card => {
      return card.cardNumber === choosenCard.cardNumber;
    });

    const currentCard = filteredCard[0];

    const parsedAmount = parseFloat(amount);

    if (currentCard.balance < parsedAmount) {
      setErrorMsg({msg: 'Insufficient balance', index: 2});
      setIsLoading(false);
      return;
    }

    const txn: TxnProps = {
      amount: parsedAmount,
      name: name,
      time: Date.now(),
      type: 'TRANSFER',
      id: txns.length + 1,
    };

    currentCard.balance = currentCard.balance - parsedAmount;

    addTxn(txn);
    updateCard(currentCard);
    setIsLoading(false);
    magicSheet.hide();
    toast.show('Money transfered successfully!');
  };

  const renderCardNumber = () => {
    if (!choosenCard) {
      return '';
    }

    return `ending with ${choosenCard.cardNumber.substring(
      choosenCard.cardNumber.length - 4,
    )}`;
  };

  const ChevronIcon = React.useCallback(
    () => (
      <Ionicons
        name={canChooseCard ? 'chevron-up-outline' : 'chevron-down-outline'}
        color={COLORS.grey}
        size={COMMON.bottomIcon}
      />
    ),
    [canChooseCard],
  );

  const errorText = useCallback(
    (errorIndex: number) => {
      if (!errorMsg || errorMsg.index !== errorIndex) {
        return <></>;
      }

      return <Text style={styles.error}>{errorMsg.msg}</Text>;
    },
    [errorMsg, styles.error],
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subHeading}>Transfer Money</Text>
        <>
          <TextInput
            selectionColor={COLORS.grey}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            value={name}
            label={'Enter Name'}
            mode="outlined"
            keyboardType="name-phone-pad"
            onChangeText={value => setName(value)}
            theme={{
              colors: {
                primary: COLORS.tertiary,
              },
            }}
          />
          {errorText(0)}
        </>

        <>
          <TextInput
            selectionColor={COLORS.grey}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            value={amount}
            keyboardType="numeric"
            label={'Enter Amount'}
            mode="outlined"
            onChangeText={value => setAmount(value)}
            theme={{
              colors: {
                primary: COLORS.tertiary,
              },
            }}
          />
          {errorText(1)}
        </>

        <>
          <Pressable
            onPress={() => {
              setCanChooseCard(!canChooseCard);
              Keyboard.dismiss();
            }}>
            <TextInput
              selectionColor={COLORS.grey}
              style={[styles.input, {pointerEvents: 'none'}]}
              placeholderTextColor={COLORS.grey}
              value={renderCardNumber()}
              keyboardType="numeric"
              label={'Choose Card'}
              mode="outlined"
              right={<TextInput.Icon icon={ChevronIcon} pointerEvents="none" />}
            />
          </Pressable>
          {!canChooseCard && choosenCard && (
            <Text style={styles.balanceText}>
              Balance: {currency(choosenCard.balance).format()}
            </Text>
          )}

          {canChooseCard && (
            <ScrollView style={styles.chooseCardContainer}>
              {cards.map((card, index) => {
                const cardNumber = `ending with ${card.cardNumber.substring(
                  card.cardNumber.length - 4,
                )}`;

                return (
                  <TouchableRipple
                    style={[styles.card, {borderTopWidth: index === 0 ? 0 : 1}]}
                    onPress={() => {
                      setChoosenCard(card);
                      setCanChooseCard(false);
                    }}
                    key={index}>
                    <Text style={styles.cardText}>{cardNumber}</Text>
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          )}
          {errorText(2)}
        </>
      </View>

      <Button
        onPress={handlePress}
        mode="contained"
        disabled={isLoading}
        style={styles.btnStyle}
        contentStyle={{height: COMMON.buttonHeight}}
        labelStyle={{...FONTS.secondaryText}}
        buttonColor={COLORS.tertiary}>
        Continue
      </Button>
    </View>
  );
};

export default TransferMoney;
