import React from 'react';
import {ViewStyle} from 'react-native';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import OperationRecv from './operation-recv';
import OperationSend from './operation-send';
import OperationInternal from './opearation-internal';
import {ProcessedOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import OperationFee from './operation-fee';

export interface OperationElementProps {
  operation: ProcessedOperation;
  containerStyle?: ViewStyle;
  cryptoTicker: string;
  fiatTicker: string;
  logo?: string;
}

const OperationElement = (props: OperationElementProps) => {
  const coinData = useCoinDetails(props.operation.coin);
  switch (props.operation.type) {
    case OperationType.recv:
      return <OperationRecv {...props} logo={coinData?.logo} />;
    case OperationType.send:
      return <OperationSend {...props} logo={coinData?.logo} />;
    case OperationType.internal:
      return <OperationInternal {...props} logo={coinData?.logo} />;
    case OperationType.commission:
      return <OperationFee {...props} logo={coinData?.logo} />
    default:
      return null;
  }
};

export default OperationElement;
