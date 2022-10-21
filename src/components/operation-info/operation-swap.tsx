import React from 'react';
import {View} from 'react-native';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {RowOperation} from './row-operation';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AddressOperation} from './address-operation';
import {ContainerOperation} from './container-operation';
import useTranslation from '../../utils/use-translation';
import {NetworkOperation} from './network-operation';
import {RateOperation} from './rate-operation';

export interface OperationSwapProps {
  operation: OperationDetails;
}

export function OperationSwap({operation}: OperationSwapProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);
  const srcCoin = useCoinDetails(operation.data?.srcCoin!);
  const dstCoin = useCoinDetails(operation.data?.dstCoin!);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
      <RowOperation
        label={t('detailsAmount')}
        content={(
          <View>
            {operation.data?.dstAmount && <AmountOperation
              amount={operation.data.dstAmount}
              ticker={srcCoin?.ticker}
              type={Type.positive}
            />}
            {operation.data?.srcAmount && <AmountOperation
              amount={operation.data.srcAmount}
              ticker={dstCoin?.ticker}
              type={Type.negative}
            />}
          </View>
        )}
      />
      {!!operation.rate && (
        <RowOperation
          label={t('detailsRate')}
          content={<RateOperation rate={operation.rate} srcTicker={srcCoin?.ticker!} dstTicker={dstCoin?.ticker!}/>}
        />
      )}
      <RowOperation label={t('detailsDate')} content={<DateOperation timestamp={operation.created}/>}/>
      <RowOperation label={t('detailsStatus')} content={<OperationStatus status={operation.status}/>}/>
      {operation.commission && <RowOperation
        label={t('detailsTransactionFee')}
        content={(
          <AmountOperation
            amount={operation.commission}
            ticker={coin?.ticker}
            type={Type.positive}
          />
        )}
      />}
      {!!operation.toAddress && <RowOperation label={t('detailsReceivedTo')} content={<AddressOperation address={operation.toAddress}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} isLast={true} content={<NetworkOperation coinId={coin.id} />} />}
    </ContainerOperation>
  );
}
