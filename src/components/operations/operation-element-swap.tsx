import {OperationProps} from './operation-element';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import {operationSwap, swapIcon} from '../../assets/images';
import {OperationsLogo} from './operations-logo';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import OperationParticipants from './operation-participants';
import OperationStatus from './operation-status';
import theme from '../../theme';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import OperationAmount, {Type} from './operation-amount';

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001;

const OperationElementSwap = ({onPress, operation}: OperationProps) => {
  const coinData = useCoinDetails(operation.coin);
  const srcCoinData = useCoinDetails(operation.data!.srcCoin!);
  const dstCoinData = useCoinDetails(operation.data!.dstCoin!);

  const {t} = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <OperationsLogo
        logo={operationSwap}
        extraLogo={getImageSource(coinData?.logo)}
        containerStyle={styles.logoContainer}
      />
      <View style={styles.dataColumn}>
        <View style={styles.leftColumn}>
          <OperationParticipants participant={t('operationSwap')} />
          <OperationStatus status={operation.status} />
        </View>
        <View style={styles.rightColumn}>
          <Image
            source={swapIcon}
            style={styles.icon}
          />
          <View style={styles.balancesColumn}>
            <View style={styles.dstAmount}>
              <Image
                source={getImageSource(dstCoinData?.logo)}
                style={styles.coinLogo}
              />
              <OperationAmount
                amount={makeRoundedBalance(cryptoPrecision, operation.data!.dstAmount, cryptoLimit)}
                type={Type.positive}
                ticker={dstCoinData?.ticker}
              />
            </View>
            <View style={styles.srcAmount}>
              <Image
                source={getImageSource(srcCoinData?.logo)}
                style={styles.coinLogo}
              />
              <OperationAmount
                amount={`-${makeRoundedBalance(cryptoPrecision, operation.data!.srcAmount, cryptoLimit)}`}
                type={Type.negative}
                ticker={srcCoinData?.ticker}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OperationElementSwap;

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
    alignItems: 'center',
    flex: 10,
    flexDirection: 'row',
  },
  icon: {
    width: 13,
    height: 18,
    marginRight: 10,
  },
  balancesColumn: {
    flexDirection: 'column',
  },
  srcAmount: {
    flexDirection: 'row',
  },
  dstAmount: {
    flexDirection: 'row',
  },
  coinLogo: {
    width: 20,
    height: 20,
    marginRight: 4,
  }
});
