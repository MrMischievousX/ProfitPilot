import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON} from '../constants/common';
import {RootStackParamList, TxnProps} from '../types';
import {COLORS} from '../constants/colors';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import useAppStore from '../store';

type props = StackScreenProps<RootStackParamList, 'transferScreen'>;

const TransferScreen = ({navigation}: props) => {
  const inset = useSafeAreaInsets();

  const {cards, txns, addTxn} = useAppStore();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [choosenCard, setChoosenCard] = useState('');
  const [canChooseCard, setCanChooseCard] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafcfd',
      paddingTop: inset.top + COMMON.tabIcon,
      paddingHorizontal: COMMON.pageSpacing,
      justifyContent: 'space-between',
      paddingBottom: inset.bottom,
    },
    input: {},
    subHeading: {
      ...FONTS.subHeadingText,
    },
    btnStyle: {
      borderRadius: COMMON.mediumMargin * 2,
    },
    chooseCardContainer: {
      borderWidth: 1,
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
  });

  const handlePress = () => {
    if (!name || name.length <= 2) {
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const txn: TxnProps = {
      amount: parseFloat(amount),
      name: name,
      time: Date.now(),
      type: 'TRANSFER',
      id: txns.length + 1,
    };

    addTxn(txn);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{gap: COMMON.pageSpacing}}>
        <Text style={styles.subHeading}>Transfer Money</Text>
        <TextInput
          selectionColor={COLORS.primary}
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
        <TextInput
          selectionColor={COLORS.primary}
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
        <Pressable
          onPress={() => {
            setCanChooseCard(!canChooseCard);
            Keyboard.dismiss();
          }}>
          <TextInput
            selectionColor={COLORS.primary}
            style={[styles.input, {pointerEvents: 'none'}]}
            placeholderTextColor={COLORS.grey}
            value={choosenCard}
            keyboardType="numeric"
            label={'Choose Card'}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={canChooseCard ? 'chevron-up' : 'chevron-down'}
              />
            }
          />
        </Pressable>
        {canChooseCard && (
          <View style={styles.chooseCardContainer}>
            {cards.map((card, index) => {
              const cardNumber = `ending with ${card.cardNumber.substring(
                card.cardNumber.length - 4,
              )}`;

              return (
                <TouchableRipple
                  style={[styles.card, {borderTopWidth: index === 0 ? 0 : 1}]}
                  onPress={() => {
                    setChoosenCard(cardNumber);
                    setCanChooseCard(false);
                  }}
                  key={index}>
                  <Text style={styles.cardText}>{cardNumber}</Text>
                </TouchableRipple>
              );
            })}
          </View>
        )}
      </View>
      <Button
        onPress={handlePress}
        mode="contained"
        style={styles.btnStyle}
        contentStyle={{height: COMMON.buttonHeight}}
        labelStyle={{...FONTS.primaryText}}
        buttonColor={COLORS.tertiary}>
        Continue
      </Button>
    </View>
  );
};

export default TransferScreen;
