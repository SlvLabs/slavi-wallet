import {OperationElementProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {Type} from './operation-amount';

const OperationFee = (props: OperationElementProps) => {
  return (
    <AbstractOperationMovement
      {...props}
      addresses={['Fee']}
      balanceType={Type.negative}
    />
  );
};

export default OperationFee;
