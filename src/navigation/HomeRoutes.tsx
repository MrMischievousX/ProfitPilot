import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../types';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {COMMON} from '../constants/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AntDesign, Ionicons, Octicons} from '../components/VectorIcons';
import {CardScreen, HomeScreen, QRScreen} from '../screens';

const Tab = createBottomTabNavigator<RootStackParamList>();

type homeTabProps = StackScreenProps<RootStackParamList, 'homeRoutes'>;

function HomeRoutes({}: homeTabProps) {
  const inset = useSafeAreaInsets();

  const styles = StyleSheet.create({
    tabItem: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
    },
    tabBar: {
      width: '46%',
      height: 60,
      position: 'absolute',
      paddingHorizontal: 12,
      left: '28%',
      borderRadius: 16,
      borderTopWidth: 0,
      backgroundColor: 'white',
      bottom: inset.bottom + COMMON.pageSpacing,
      shadowColor: 'black',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 56,
      elevation: 24,
    },
  });

  const HomeIcon = React.useCallback(
    ({focused}: {focused: boolean}) => (
      <AntDesign
        name={'home'}
        color={focused ? COLORS.tertiary : COLORS.tabGrey}
        size={COMMON.bottomIcon}
      />
    ),
    [],
  );

  const ScanIcon = React.useCallback(
    ({focused}: {focused: boolean}) => (
      <Ionicons
        name={'scan'}
        color={focused ? COLORS.tertiary : COLORS.tabGrey}
        size={COMMON.bottomIcon}
      />
    ),
    [],
  );

  const CardIcon = React.useCallback(
    ({focused}: {focused: boolean}) => (
      <Octicons
        name={'credit-card'}
        color={focused ? COLORS.tertiary : COLORS.tabGrey}
        size={COMMON.bottomIcon}
      />
    ),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.inactiveTab,
        tabBarItemStyle: styles.tabItem,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={'homeScreenTab'}
        options={{
          tabBarIcon: HomeIcon,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={'qrScreenTab'}
        options={{
          tabBarIcon: ScanIcon,
        }}
        component={QRScreen}
      />
      <Tab.Screen
        name={'cardScreenTab'}
        options={{
          tabBarIcon: CardIcon,
        }}
        component={CardScreen}
      />
    </Tab.Navigator>
  );
}

export default HomeRoutes;
