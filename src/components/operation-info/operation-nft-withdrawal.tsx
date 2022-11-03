import React from 'react';
import {SingleNftOperation, SingleNftOperationProps} from './single-nft-operation';
import {Type} from '../operations/operation-amount';

export function OperationNftWithdrawal(props: SingleNftOperationProps) {
  return <SingleNftOperation {...props} type={Type.negative}/>
}
