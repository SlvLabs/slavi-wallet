import {OperationProps} from './operation-element';
import React from 'react';
import AbstractOperationMovement from './abstract-operation-movement';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

const OperationElementPolkadotReward = (props: OperationProps) => {
  const coinData = useCoinDetails(props.operation.coin);

  const {t} = useTranslation();

  return (
    <AbstractOperationMovement
      {...props}
      balanceType={Type.positive}
      title={t('operationPolkadotReward')}
      logo={getImageSource(coinData?.logo)}
    />
  );
};

export default OperationElementPolkadotReward;
