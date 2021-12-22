import {OperationElementProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {Type} from './operation-amount';
import {ProcessedMovement} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';

const OperationRecv = (props: OperationElementProps) => {
  return (
    <AbstractOperationMovement
      {...props}
      addresses={
        props.operation.from
          ? props.operation.from.map(
              (element: ProcessedMovement) => element.name,
            )
          : []
      }
      balanceType={Type.positive}
    />
  );
};

export default OperationRecv;
