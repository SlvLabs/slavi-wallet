import {Type} from './operation-amount';
import AbstractOperationMovement from './abstract-operation-movement';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import {OperationProps} from './operation-element';
import {operationCall} from '../../assets/images';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export function OperationElementCall(props: OperationProps) {
  const {t} = useTranslation();
  const coinData = useCoinDetails(props.operation.coin);

  return (
    <AbstractOperationMovement
      {...props}
      balanceType={Type.positive}
      title={t('operationCall')}
      logo={operationCall}
      extraLogo={getImageSource(coinData?.logo)}
    />
  );
}
