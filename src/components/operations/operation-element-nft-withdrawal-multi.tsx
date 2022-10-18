import React from 'react';
import {
  AbstractOperationNftElementMulti,
} from './abstract-operation-nft-element-multi';
import {Type} from './operation-amount';
import useTranslation from '../../utils/use-translation';
import {nftWithdraw} from '../../assets/images';
import {OperationProps} from './operation-element';
import getImageSource from '../../utils/get-image-source';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export function OperationElementNftWithdrawalMulti(props: OperationProps) {
  const {t} = useTranslation();
  const coinData = useCoinDetails(props.operation.coin);

  return <AbstractOperationNftElementMulti
    {...props}
    balanceType={Type.negative}
    title={t('operationNftMultiWithdrawal')}
    logo={nftWithdraw}
    extraLogo={getImageSource(coinData?.logo)}
    amount={props.operation.nft?.fromAmount}
  />;
}
