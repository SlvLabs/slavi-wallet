import React from 'react';
import {
  AbstractOperationNftElementMulti,
} from './abstract-operation-nft-element-multi';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import {OperationProps} from './operation-element';
import {nftDeposit} from '../../assets/images';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export function OperationElementNftDepositMulti(props: OperationProps) {
  const {t} = useTranslation();
  const coinData = useCoinDetails(props.operation.coin);

  return <AbstractOperationNftElementMulti
    {...props}
    balanceType={Type.positive}
    title={t('operationNftMultiDeposit')}
    logo={nftDeposit}
    extraLogo={getImageSource(coinData?.logo)}
    amount={props.operation.nft?.toAmount}
  />;
}
