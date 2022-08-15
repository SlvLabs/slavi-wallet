import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import useTranslation from '../../utils/use-translation';
import {nftArrow} from '../../assets/images';
import shrinkAddress from '../../utils/shrink-address';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface MoreRecipientElementProps {
  amount: string;
  address: string;
  ticker: string;
  logo?: string
}

export default function MoreRecipientElement({address, amount, ticker, logo}: MoreRecipientElementProps) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image source={getImageSource(logo)} style={styles.logo} />
        <Text style={styles.sent}>{t('sent')}</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.textColumn}>
          <Text style={styles.amount}>{`${amount} ${ticker}`}</Text>
          <Text style={styles.address}>{shrinkAddress(address)}</Text>
        </View>
        <View style={styles.iconColumn}>
          <Image source={nftArrow} style={styles.icon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    padding: Layout.isSmallDevice ? 9 : 16,
    borderRadius: Layout.isSmallDevice ? 8 : 12,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: Layout.isSmallDevice ? 30 : 40,
    height: Layout.isSmallDevice ? 30 : 40,
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: Layout.isSmallDevice ? 17 : 19,
    color: theme.colors.white,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
  },
  iconColumn: {
    marginLeft: Layout.isSmallDevice ? 10 : 15,
  },
  icon: {
    width: 19,
    height: 19,
  },
  sent: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
    marginLeft: 12,
  }
});
