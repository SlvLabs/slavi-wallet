import {OperationProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import getImageSource from '../../utils/get-image-source';

const OperationFee = (props: OperationProps) => {
  const {t} = useTranslation();
  const coinData = useCoinDetails(props.operation.coin);

  return (
    <AbstractOperationMovement
      {...props}
      title={t('operationBurn')}
      balanceType={Type.negative}
      logo={getImageSource(coinData?.logo)}
    />
  );
};

export default OperationFee;
