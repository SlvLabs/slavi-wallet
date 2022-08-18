import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import {nftArrow} from '../../assets/images';
import shrinkAddress from '../../utils/shrink-address';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import Layout from '../../utils/layout';
import CryptoAmountText from '../text/crypto-amount-text';

export interface SingleRecipientInfoProps {
  amount: string;
  ticker: string;
  address: string;
  logo?: string;
}

export default function SingleRecipientInfo({amount, address, ticker, logo}: SingleRecipientInfoProps) {
  const {t} = useTranslation();

  return (
    <View style={styles.firstRecipientContainer}>
      <View style={styles.amountRow}>
        <View style={styles.logoCol}>
          <Image source={getImageSource(logo)}  style={styles.coinLogo}/>
        </View>
        <View style={styles.amountCol}>
          <Text style={styles.sentLabel}>{t('sent')}</Text>
          <CryptoAmountText value={amount} style={styles.amountText} ticker={ticker} />
        </View>
      </View>
      <View style={styles.delimiterRow}>
        <View style={styles.delimiter}/>
        <Image source={nftArrow} style={styles.delimiterImage}/>
        <View style={styles.delimiter}/>
      </View>
      <View style={styles.addressRow}>
        <Text style={styles.address}>{shrinkAddress(address)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  firstRecipientContainer: {
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: Layout.isSmallDevice ? 8 : 16,
    paddingTop: Layout.isSmallDevice ? 14 : 26,
    paddingBottom: Layout.isSmallDevice ? 14 : 26,
    paddingLeft: Layout.isSmallDevice ? 12 : 24,
    paddingRight: Layout.isSmallDevice ? 12 : 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.isSmallDevice ? 20 : 32,
  },
  coinLogo: {
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
  },
  amountRow: {
    flexDirection: 'row',
  },
  logoCol: {
    marginRight: 16,
  },
  amountCol: {},
  delimiterRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.isSmallDevice ? 12 : 18,
    marginTop: Layout.isSmallDevice ? 12 : 18,
  },
  addressRow: {},
  sentLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: Layout.isSmallDevice ? 14 : 15,
    color: theme.colors.lightGray,
  },
  amountText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: Layout.isSmallDevice ? 20 : 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 13 : 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  delimiter: {
    width: Layout.window.width/2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  delimiterImage: {
    width: 19,
    height: 19,
  }
});
