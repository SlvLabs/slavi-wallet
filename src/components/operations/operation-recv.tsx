import {OperationElementProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {ProcessedMovement} from '@slavi/wallet-core/types/providers/ws/hooks/use-operations-list';
import {Type} from './operation-amount';

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
