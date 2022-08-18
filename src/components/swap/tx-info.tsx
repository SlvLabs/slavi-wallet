import React from 'react';
import { Text } from 'react-native';
import {Image, StyleSheet, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import NumberText from '../text/number-text';

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
        <NumberText value={amount} style={styles.amountText} />
      </View>
    </View>
  );
}

export default function TxInfo(props: TxInfoProps) {
  const {srcLogo, srcCoin, srcAmount, dstCoin, dstAmount, dstLogo} = props;

  return (
    <View style={styles.container}>
      <CoinRow coin={srcCoin} amount={srcAmount} logo={srcLogo} />
      <View style={styles.delimiterView}>
        <View style={styles.delimiterLeft} />
        <View style={styles.delimiterIcon}>
          <CustomIcon name={'exchange1'} color={theme.colors.green} size={12} />
        </View>
        <View style={styles.delimiterRight} />
      </View>
      <CoinRow coin={dstCoin} amount={dstAmount} logo={dstLogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    backgroundColor: theme.colors.cardBackground2,
    padding: 12,
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  delimiterLeft: {
    marginRight: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
  },
  delimiterRight: {
    marginLeft: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
  },
  delimiterIcon: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderGreen,
    borderRadius: 6,
    padding: 3,
    flex: 0,
  },
});
