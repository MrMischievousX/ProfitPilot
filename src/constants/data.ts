import {CardProps, TxnProps} from '../types';
export const userImage = 'https://randomuser.me/api/portraits/women/43.jpg';

export const cardData: CardProps[] = [
  {
    id: 1,
    balance: 40500.8,
    cardNumber: '1111222233334444',
    date: '01/28',
    name: 'Sarah Muller',
  },
  {
    id: 2,
    balance: 40500.8,
    cardNumber: '1234123412341234',
    date: '02/28',
    name: 'Sarah Muller',
  },
  {
    id: 3,
    balance: 40500.8,
    cardNumber: '1111222233334444',
    date: '03/28',
    name: 'Sarah Muller',
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

export const CARDCOLORS = ['#87dcfb', 'lightgrey', '#bedcc0'];

export const LINECOLORS = ['#446e7e', 'grey', '#5f6e60'];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
