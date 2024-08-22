import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../constants/fonts';
import {COMMON} from '../constants/common';
import {CardProps} from '../types';
import {COLORS} from '../constants/colors';
import {Button, TextInput} from 'react-native-paper';
import useAppStore from '../store';
import {magicSheet} from 'react-native-magic-sheet';
import {useToast} from 'react-native-toast-notifications';
import {capitalizeFirstLetter} from '../utils/services';

interface props {}

const AddCard = ({}: props) => {
  const {addCard, cards} = useAppStore();
  const toast = useToast();

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
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
      width: 'auto',
      flexGrow: 1,
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
      marginTop: COMMON.pageMargin,
    },
    expiryContainer: {flexDirection: 'row', gap: COMMON.largeMargin},
  });

  const handlePress = () => {
    setErrorMsg({msg: '', index: -1});
    setIsLoading(true);

    if (!name || name.length <= 2) {
      setErrorMsg({msg: 'Please enter your name', index: 0});
      setIsLoading(false);
      return;
    }

    if (!cardNumber || cardNumber.length !== 16) {
      setErrorMsg({msg: 'Please enter a valid card number', index: 1});
      setIsLoading(false);
      return;
    }

    if (cards.map(card => card.cardNumber).includes(cardNumber)) {
      setErrorMsg({msg: 'Card already exist', index: 1});
      setIsLoading(false);
      return;
    }

    if (
      !expiryMonth ||
      parseFloat(expiryMonth) > 12 ||
      parseFloat(expiryMonth) <= 0
    ) {
      setErrorMsg({msg: 'Please choose a valid expiry month', index: 2});
      setIsLoading(false);
      return;
    }

    const currentYear = new Date().getFullYear();

    if (
      !expiryYear ||
      parseFloat(expiryYear) < currentYear ||
      parseFloat(expiryMonth) >= currentYear + 10
    ) {
      setErrorMsg({msg: 'Please choose a valid expiry year', index: 2});
      setIsLoading(false);
      return;
    }

    const card: CardProps = {
      name: capitalizeFirstLetter(name),
      cardNumber: cardNumber,
      date: `${
        expiryMonth.length === 1 ? '0' + expiryMonth : expiryMonth
      }/${expiryYear.substring(expiryYear.length - 2)}`,
      id: cards.length + 1,
      balance: Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000,
    };

    addCard(card);
    setIsLoading(false);
    magicSheet.hide();
    toast.show('Card added successfully!');
  };

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
        <Text style={styles.subHeading}>Add new card</Text>
        <>
          <TextInput
            selectionColor={COLORS.grey}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            value={name}
            label={'Enter your name'}
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
            value={cardNumber}
            keyboardType="numeric"
            label={'Enter card number'}
            mode="outlined"
            maxLength={16}
            onChangeText={value => setCardNumber(value)}
            theme={{
              colors: {
                primary: COLORS.tertiary,
              },
            }}
          />
          {errorText(1)}
        </>

        <View style={styles.expiryContainer}>
          <TextInput
            selectionColor={COLORS.grey}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            value={expiryMonth}
            keyboardType="numeric"
            label={'Enter expiry month'}
            mode="outlined"
            maxLength={2}
            onChangeText={value => setExpiryMonth(value)}
            theme={{
              colors: {
                primary: COLORS.tertiary,
              },
            }}
          />
          <TextInput
            selectionColor={COLORS.grey}
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            value={expiryYear}
            keyboardType="numeric"
            label={'Enter expiry year'}
            maxLength={4}
            mode="outlined"
            onChangeText={value => setExpiryYear(value)}
            theme={{
              colors: {
                primary: COLORS.tertiary,
              },
            }}
          />
        </View>
        {errorText(2)}
        {errorText(3)}
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

export default AddCard;
