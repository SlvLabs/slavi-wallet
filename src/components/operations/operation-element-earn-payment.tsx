import {OperationProps} from './operation-element';
import React from 'react';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {AbstractOperationEarn} from './abstract-operation-earn';

export function OperationElementEarnPayment(props: OperationProps) {
  const coinData = useCoinDetails(props.operation.coin);

  const {t} = useTranslation();

  return (
    <AbstractOperationEarn
      {...props}
      balanceType={Type.positive}
      title={t('operationEarnPayment')}
      logo={getImageSource(coinData?.logo)}
    />
  );
}
