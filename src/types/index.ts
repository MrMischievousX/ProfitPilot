import {TLineChartDataProp} from 'react-native-wagmi-charts';

export type CardProps = {
  balance: number;
  cardNumber: string;
  date: string;
  id: number;
  name: string;
};

export type TxnProps = {
  id: number;
  name: string;
  time: number;
  type: 'RECEIVE' | 'TRANSFER';
  amount: number;
};

export type RootStackParamList = {
  // routes
  authRoutes: undefined;
  homeRoutes: undefined;

  // tabs
  homeScreenTab: undefined;
  qrScreenTab: {} | undefined;
  cardScreenTab: {} | undefined;

  // screens
  onboardingScreen: {} | undefined;
  cardDetails: {cardDetails: CardProps};
};

export type YearlyChartData = {
  [key: string]: TLineChartDataProp;
};
