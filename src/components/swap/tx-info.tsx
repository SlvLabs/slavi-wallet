import React from 'react';
import { Text } from 'react-native';
import {Image, StyleSheet, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface TxInfoProps {
  srcCoin: string;
  srcAmount: string;
  srcLogo?: string;
  dstLogo?: string;
  dstCoin: string;
  dstAmount: string;
}

interface CoinRowProps {
  coin: string;
  amount: string;
  logo?: string;
}

function CoinRow(props: CoinRowProps) {
  const {logo, amount, coin} = props;

  return (
    <View style={styles.row}>
      <View style={styles.leftColumn}>
        <Image source={getImageSource(logo)} style={styles.logo} />
        <Text style={styles.coinText}>{coin}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.amountText}>{amount}</Text>
      </View>
    </View>
  )
}

export default function TxInfo(props: TxInfoProps) {
  const {srcLogo, srcCoin, srcAmount, dstCoin, dstAmount, dstLogo} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <CoinRow coin={srcCoin} amount={srcAmount} logo={srcLogo} />
      <View style={styles.delimiterView}>
        <View style={styles.delimiter}/>
        <Text style={styles.delimiterText}>{t('for')}</Text>
        <View style={styles.delimiter}/>
      </View>
      <CoinRow coin={dstCoin} amount={dstAmount} logo={dstLogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
  },
  logo: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  coinText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.lighter,
    alignSelf: 'center',
  },
  leftColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  amountText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.lighter,
    alignSelf: 'center',
    textAlign: 'right',
  },
  delimiterView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  delimiter: {
    width: Layout.window.width/2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  delimiterText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.lighter,
    alignSelf: 'center',
  },
});
