import {Type} from './operation-amount';
import AbstractOperationMovement from './abstract-operation-movement';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import {OperationProps} from './operation-element';
import {operationApproveCall} from '../../assets/images';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export function OperationElementApproveCall(props: OperationProps) {
  const {t} = useTranslation();
  const coinData = useCoinDetails(props.operation.coin);

  return (
    <AbstractOperationMovement
      {...props}
      balanceType={Type.positive}
      title={t('operationApprove')}
      logo={operationApproveCall}
      extraLogo={getImageSource(coinData?.logo)}
    />
  );
}
