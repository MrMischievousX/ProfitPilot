import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../constants/colors';

const Loader = () => {
  const styles = StyleSheet.create({
    loader: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.lightBackground,
    },
  });
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

export default Loader;
