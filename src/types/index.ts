export type CardProps = {
  balance: string;
  cardNumber: string;
  date: string;
  id: number;
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
  transferScreen: {} | undefined;
};
