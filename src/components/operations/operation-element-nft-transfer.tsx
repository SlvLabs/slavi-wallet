import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {OperationsLogo} from './operations-logo';
import OperationParticipants from './operation-participants';
import OperationStatus from './operation-status';
import OperationAmount, {Type} from './operation-amount';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import theme from '../../theme';
import {OperationProps} from './operation-element';
import useTranslation from '../../utils/use-translation';
import {operationNftTransfer} from '../../assets/images';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001

export function OperationElementNftTransfer({onPress, operation}: OperationProps) {
  const {t} = useTranslation();
  const coinData = useCoinDetails(operation.coin);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <OperationsLogo
        logo={operationNftTransfer}
        extraLogo={getImageSource(coinData?.logo)}
        containerStyle={styles.logoContainer}
      />
      <View style={styles.dataColumn}>
        <View style={styles.leftColumn}>
          <OperationParticipants participant={t('operationNftTransfer')} />
          <OperationStatus status={operation.status} />
        </View>
        <View style={styles.rightColumn}>
          <OperationAmount
            amount={makeRoundedBalance(cryptoPrecision, operation.nft?.toAmount, cryptoLimit)}
            type={Type.positive}
            ticker={'NFTs'}
            tickerStyle={styles.ticker}
          />
          <OperationAmount
            amount={makeRoundedBalance(cryptoPrecision, operation.nft?.fromAmount, cryptoLimit)}
            type={Type.negative}
            ticker={'NFTs'}
            tickerStyle={styles.ticker}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 17,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  logoContainer: {
    paddingRight: 8,
    flex: 1,
  },
  dataColumn: {
    flex: 8,
    flexDirection: 'row',
  },
  leftColumn: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 6,
  },
  rightColumn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 4,
  },
  ticker: {
    textTransform: 'none',
  }
});
