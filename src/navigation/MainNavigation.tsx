import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {CardDetails, OnboardingScreen} from '../screens';
import HomeRoutes from './HomeRoutes';

const Stack = createStackNavigator<RootStackParamList>();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalFadeTransition,
        }}>
        <Stack.Screen name={'onboardingScreen'} component={OnboardingScreen} />
        <Stack.Screen name={'homeRoutes'} component={HomeRoutes} />
        <Stack.Screen name={'cardDetails'} component={CardDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
