import React from 'react';
import {Image, StyleSheet, View, ViewStyle, Text} from 'react-native';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';

export interface NetworkOperation {
  coinId: string;
  containerStyle?: ViewStyle;
}

export function NetworkOperation({coinId, containerStyle}: NetworkOperation) {
  const coinDetails = useCoinDetails(coinId);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Image source={getImageSource(coinDetails?.logo)} style={styles.image}/>
      <Text style={styles.text}>{coinDetails?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
  },
});
