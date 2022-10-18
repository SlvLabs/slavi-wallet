import React from 'react';
import {ImageSourcePropType, StyleSheet, TouchableOpacity, View} from 'react-native';
import {OperationsLogo} from './operations-logo';
import OperationParticipants from './operation-participants';
import OperationStatus from './operation-status';
import theme from '../../theme';
import {ListOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import OperationAmount, {Type} from './operation-amount';
import {OperationElementProps} from './operation-element';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface AbstractOperationNftElementMultiProps extends OperationElementProps {
  operation: ListOperation;
  balanceType: Type;
  title: string;
  logo: ImageSourcePropType;
  extraLogo?: ImageSourcePropType;
  amount?: string;
}

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001

export function AbstractOperationNftElementMulti({
                                                   logo,
                                                   extraLogo,
                                                   operation,
                                                   balanceType,
                                                   title,
                                                   onPress,
                                                   amount
}: AbstractOperationNftElementMultiProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <OperationsLogo logo={logo} extraLogo={extraLogo} containerStyle={styles.logoContainer} />
      <View style={styles.dataColumn}>
        <View style={styles.leftColumn}>
          <OperationParticipants participant={title} />
          <OperationStatus status={operation.status} />
        </View>
        <View style={styles.rightColumn}>
          <OperationAmount
            amount={makeRoundedBalance(cryptoPrecision, amount, cryptoLimit)}
            type={balanceType}
            ticker={'other NFTs'}
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
