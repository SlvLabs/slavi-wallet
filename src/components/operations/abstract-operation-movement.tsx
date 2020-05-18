import {OperationElementProps} from './operation-element';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import OperationParticipants from './operation-participants';
import Card from '../view/card';
import OperationStatus from './operation-status';
import OperationConvertedBalances from './operation-converted-balances';
import OperationAmount, {Type} from './operation-amount';
import OperationCoinType from './operation-coin-type';
import {ProcessedOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface AbstractOperationMovementProps extends OperationElementProps {
  operation: ProcessedOperation;
  fiatTicker: string;
  cryptoTicker: string;
  balanceType: Type;
  addresses?: string[];
  type?: string;
}

const cryptoPercision = 8;
const fiatPercision = 2;

const AbstractOperationMovement = (props: AbstractOperationMovementProps) => {
  const coin = useCoinDetails(props.operation.coin);
  return (
    <Card style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.topRow}>
        <OperationParticipants participants={props.addresses} />
        <View style={styles.topRight}>
          <OperationAmount
            amount={makeRoundedBalance(cryptoPercision, props.operation.amount)}
            type={props.balanceType}
            ticker={coin?.ticker}
          />
          {props.type && <OperationCoinType type={props.type} />}
        </View>
      </View>
      <View style={styles.bottomRow}>
        <OperationStatus status={props.operation.status} />
        <OperationConvertedBalances
          cryptoBalance={makeRoundedBalance(
            cryptoPercision,
            props.operation.cryptoAmount,
          )}
          fiatBalance={makeRoundedBalance(
            fiatPercision,
            props.operation.fiatAmount,
          )}
          cryptoTicker={props.cryptoTicker}
          fiatTicker={props.fiatTicker}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  topRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: 'center',
  },
  amountContainer: {},
  amount: {},
  typeTagContainer: {},
  typeTag: {},
  statusContainer: {},
  status: {},
  convertedBalanceContainer: {},
  convertedBalance: {},
  topRight: {
    flexDirection: 'row',
  },
});

export default AbstractOperationMovement;
