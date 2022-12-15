import React from 'react';
import {Text, ViewStyle} from 'react-native';
import {Image, StyleSheet, View} from 'react-native';
import getImageSource from '../../../utils/get-image-source';
import useTranslation from '../../../utils/use-translation';
import theme from '../../../theme';
import Layout from '../../../utils/layout';

export interface ApyElementProps {
  logo?: string;
  value: string;
  ticker: string;
  containerStyle?: ViewStyle;
}

export function ApyElement({logo, value, ticker, containerStyle}: ApyElementProps) {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.mainBlock}>
        <View style={styles.leftColumn}>
          <Image source={getImageSource(logo)} style={styles.logo}/>
          <Text style={styles.label}>{`${t('stakingStaking')} ${ticker}`}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.apy}>{`${value}% ${t('stakingApy')}`}</Text>
        </View>
      </View>
      <Text style={styles.description}>{t('stakingApyDescription', {ticker: ticker})}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mainBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: theme.colors.simpleCoinBackground,
    borderRadius: 8,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 19,
    color: theme.colors.white,
  },
  apy: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 19,
    color: theme.colors.gold2,
    textTransform: 'uppercase',
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightColumn: {
    alignItems: 'center',
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.white,
    opacity: 0.7,
    marginTop: 8,
  }
});
