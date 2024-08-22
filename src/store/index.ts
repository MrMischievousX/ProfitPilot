import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {CardProps, TxnProps} from '../types';
import zustandStorage from './zustandStorage';

interface AppState {
  cards: CardProps[];
  txns: TxnProps[];
  addCard: (card: CardProps) => void;
  updateCard: (updatedCard: CardProps) => void;
  addCards: (card: CardProps[]) => void;
  addTxn: (txn: TxnProps) => void;
  addTxns: (txn: TxnProps[]) => void;
  reset: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    set => ({
      cards: [],
      txns: [],
      addCard: (card: CardProps) => {
        set(state => {
          return {cards: [...state.cards, card]};
        });
      },
      updateCard: (updatedCard: CardProps) => {
        set(state => {
          const newCards = state.cards.map(card => {
            if (card.id === updatedCard.id) {
              return updatedCard;
            }
            return card;
          });
          return {cards: newCards};
        });
      },
      addTxn: (txn: TxnProps) => {
        set(state => {
          return {txns: [...state.txns, txn]};
        });
      },
      addCards: (cards: CardProps[]) => {
        set(() => {
          return {cards};
        });
      },
      addTxns: (txns: TxnProps[]) => {
        set(() => {
          return {txns};
        });
      },
      reset: () => {
        set(() => {
          return {cards: [], txns: []};
        });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandStorage('app-storage')),
    },
  ),
);

export default useAppStore;
