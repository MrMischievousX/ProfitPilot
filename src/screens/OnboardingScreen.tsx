import React from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COMMON} from '../constants/common';
import {window} from '../constants/layout';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Onboard} from '../assets/png';

type props = StackScreenProps<RootStackParamList, 'onboardingScreen'>;

const OnboardingScreen = ({}: props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const inset = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      gap: COMMON.mediumMargin,
      justifyContent: 'center',
    },
    subHeading: {
      ...FONTS.subHeadingText,
      paddingHorizontal: COMMON.pageSpacing,
      bottom: -COMMON.largeSpacing,
      position: 'relative',
      zIndex: 10,
    },
    heading: {
      ...FONTS.headingText,
      paddingHorizontal: COMMON.pageSpacing,
    },
    body: {
      ...FONTS.bodyText,
      paddingHorizontal: COMMON.pageSpacing,
    },
    btnStyle: {
      borderRadius: COMMON.mediumMargin * 2,
      marginTop: 'auto',
      marginHorizontal: COMMON.pageSpacing,
    },
    img: {
      width: '100%',
      height: window.height * 0.45,
      objectFit: 'cover',
    },
  });

  const handlePress = () => {
    navigation.navigate('homeRoutes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>ProfitPilot</Text>
      <Image source={Onboard} style={styles.img} />
      <Text style={styles.heading}>
        Your <Text style={FONTS.headingBold}>{'\nFinancial'}</Text> Navigator
      </Text>
      <Text style={styles.body}>
        Invest in projects that make difference. Join us in supporting impactful
        initiativesand create a positive change in the world
      </Text>
      <Button
        onPress={handlePress}
        mode="contained"
        style={styles.btnStyle}
        contentStyle={{height: COMMON.buttonHeight}}
        labelStyle={{...FONTS.primaryText}}
        buttonColor={COLORS.tertiary}>
        Get Started
      </Button>
    </View>
  );
};

export default OnboardingScreen;
