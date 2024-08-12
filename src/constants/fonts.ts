import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {dp} from './layout';

export const FONTS = StyleSheet.create({
  primaryText: {
    fontSize: dp(16),
    color: COLORS.white,
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
  },
  primaryTextBold: {
    fontSize: dp(16),
    color: COLORS.white,
    fontWeight: '600',
    fontFamily: 'SFProText-Medium',
  },
  secondaryText: {
    fontSize: dp(18),
    color: COLORS.white,
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
  },
  secondaryTextBold: {
    fontSize: dp(18),
    color: COLORS.white,
    fontWeight: '500',
    fontFamily: 'SFProText-Medium',
  },
  tertiaryText: {
    fontSize: dp(32),
    color: COLORS.tertiary,
    fontWeight: '500',
    fontFamily: 'SFProText-Medium',
  },
  headingText: {
    fontSize: dp(56),
    color: COLORS.tertiary,
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
    lineHeight: dp(58),
  },
  headingBold: {
    fontSize: dp(58),
    color: COLORS.tertiary,
    fontWeight: 'bold',
    fontFamily: 'SFProText-Bold',
    lineHeight: dp(60),
  },
  subHeadingText: {
    fontSize: dp(28),
    color: COLORS.tertiary,
    fontWeight: '500',
    fontFamily: 'SFProText-Medium',
  },
  bodyText: {
    fontSize: dp(14),
    color: COLORS.greyText,
    fontWeight: '400',
    fontFamily: 'SFProText-Regular',
  },
  bodyTextBold: {
    fontSize: dp(14),
    color: COLORS.greyText,
    fontWeight: '500',
    fontFamily: 'SFProText-Medium',
  },
});
