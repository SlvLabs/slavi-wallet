import {OperationElementProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {ProcessedMovement} from '@slavi/wallet-core/types/providers/ws/hooks/use-operations-list';
import {Type} from './operation-amount';

const OperationInternal = (props: OperationElementProps) => {
  return (
    <AbstractOperationMovement
      {...props}
      addresses={
        props.operation.to
          ? props.operation.to.map((element: ProcessedMovement) => element.name)
          : []
      }
      balanceType={Type.negative}
    />
  );
};

export default OperationInternal;
