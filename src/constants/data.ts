import {CardProps, TxnProps} from '../types';
export const chartData = [
  {
    timestamp: 1625945400000,
    value: 30,
  },
  {
    timestamp: 1625945400000,
    value: 20,
  },
  {
    timestamp: 1625946300000,
    value: 37,
  },
  {
    timestamp: 1625946300000,
    value: 30,
  },
  {
    timestamp: 1625947200000,
    value: 45,
  },
  {
    timestamp: 1625948100000,
    value: 26,
  },
  {
    timestamp: 1625945400000,
    value: 57,
  },
];

export const cardData: CardProps[] = [
  {
    id: 1,
    balance: '40500.80',
    cardNumber: '1111 2222 3333 4444',
    date: '01/28',
  },
  {
    id: 2,
    balance: '40500.80',
    cardNumber: '1234 1234 1234 1234',
    date: '02/28',
  },
  {
    id: 3,
    balance: '40500.80',
    cardNumber: '1111 2222 3333 4444',
    date: '03/28',
  },
];

export const txnData: TxnProps[] = [
  {
    id: 1,
    amount: 20,
    name: 'Fimansyah A.',
    type: 'TRANSFER',
    time: 1723418804930,
  },
  {
    id: 2,
    amount: 120,
    name: 'Adam S.',
    type: 'RECEIVE',
    time: 1723447604930,
  },
  {
    id: 3,
    amount: 20,
    name: 'Riyansyah B.',
    type: 'TRANSFER',
    time: 1723436804930,
  },
  {
    id: 4,
    amount: 100,
    name: 'Ardinsyah C.',
    type: 'RECEIVE',
    time: 1723454804930,
  },
];
