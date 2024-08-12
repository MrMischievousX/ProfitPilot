import {StyleSheet} from 'react-native';
import {dp} from './layout';

export const COMMON = {
  // spacing
  pageSpacing: dp(12),
  mediumSpacing: dp(16),
  largeSpacing: dp(24),

  // margin
  smallMargin: dp(4),
  pageMargin: dp(6),
  mediumMargin: dp(8),
  largeMargin: dp(12),
  xxlMargin: dp(20),

  // size
  buttonHeight: dp(56),
  tabIcon: dp(32),
  bottomIcon: dp(28),
  iconSize: dp(48),
  smallIcon: dp(20),
  mediumIcon: dp(56),
  largeIcon: dp(64),
  qrSize: dp(300),

  // boder radius
  cardRadius: dp(28),
};

export const STYLE = StyleSheet.create({
  shadow: {
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 64,
    elevation: 16,
  },
  lightShadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 32,
  },
});
