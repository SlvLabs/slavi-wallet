import {OperationProps} from './operation-element';
import React from 'react';
import {ImageSourcePropType, StyleSheet, TouchableOpacity, View} from 'react-native';
import OperationParticipants from './operation-participants';
import OperationStatus from './operation-status';
import OperationAmount, {Type} from './operation-amount';
import OperationCoinType from './operation-coin-type';
import {ListOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import theme from '../../theme';
import {OperationsLogo} from './operations-logo';

export interface AbstractOperationEarnProps extends OperationProps {
  operation: ListOperation;
  balanceType: Type;
  title: string;
  logo: ImageSourcePropType;
  extraLogo?: ImageSourcePropType;
}

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001;

export function AbstractOperationEarn({
  operation,
  logo,
  extraLogo,
  onPress,
  containerStyle,
  balanceType,
  title,
}: AbstractOperationEarnProps) {
  const coin = useCoinDetails(operation.coin);

  return (
    <TouchableOpacity style={{...styles.container, ...containerStyle}} onPress={onPress}>
      <OperationsLogo logo={logo} extraLogo={extraLogo} containerStyle={styles.logoContainer} />
      <View style={styles.dataColumn}>
        <View style={styles.leftColumn}>
          <OperationParticipants participant={title} />
          <OperationStatus status={operation.status} />
        </View>
        <View style={styles.rightColumn}>
          <OperationAmount
            amount={makeRoundedBalance(cryptoPrecision, operation.amount, cryptoLimit)}
            type={balanceType}
            ticker={coin?.ticker}
          />
          {coin?.type && <OperationCoinType type={coin.type} />}
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
    flex: 1,
  },
  rightColumn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
});
