import React from 'react';
import {ViewStyle} from 'react-native';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import OperationRecv from './operation-recv';
import OperationSend from './operation-send';
import OperationInternal from './opearation-internal';
import {ProcessedOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';

export interface OperationElementProps {
  operation: ProcessedOperation;
  containerStyle?: ViewStyle;
  cryptoTicker: string;
  fiatTicker: string;
}

const OperationElement = (props: OperationElementProps) => {
  switch (props.operation.type) {
    case OperationType.recv:
      return <OperationRecv {...props} />;
    case OperationType.send:
      return <OperationSend {...props} />;
    case OperationType.internal:
      return <OperationInternal {...props} />;
    default:
      return null;
  }
};

export default OperationElement;
