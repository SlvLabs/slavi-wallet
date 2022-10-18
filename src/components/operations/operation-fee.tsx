import {OperationProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import {operationBurn} from '../../assets/images';

const OperationFee = (props: OperationProps) => {
  const {t} = useTranslation();
  return (
    <AbstractOperationMovement
      {...props}
      title={t('operationBurn')}
      balanceType={Type.negative}
      logo={operationBurn}
    />
  );
};

export default OperationFee;
