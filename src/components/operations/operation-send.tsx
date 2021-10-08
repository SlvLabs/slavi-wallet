import {OperationElementProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {ProcessedMovement} from '@slavi/wallet-core/types/providers/ws/hooks/use-operations-list';
import {Type} from './operation-amount';

const OperationSend = (props: OperationElementProps) => {
  return (
    <AbstractOperationMovement
      {...props}
      addresses={
        props.operation.to && props.operation.to.length > 0
          ? props.operation.to.map((element: ProcessedMovement) => element.name)
          : ['Fee']
      }
      balanceType={Type.negative}
    />
  );
};

export default OperationSend;
