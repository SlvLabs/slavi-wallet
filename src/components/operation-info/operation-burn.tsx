import React from 'react';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {ContainerOperation} from './container-operation';
import {RowOperation} from './row-operation';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AddressOperation} from './address-operation';
import {NetworkOperation} from './network-operation';

export interface OperationBurnProps {
  operation: OperationDetails;
}

export function OperationBurn({operation}: OperationBurnProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
      {operation.amount && (
        <RowOperation
          label={t('detailsAmount')}
          content={(
            <AmountOperation
              amount={operation.amount}
              ticker={coin?.ticker}
              type={Type.positive}
            />
          )}
        />)}
      <RowOperation label={t('detailsDate')} content={<DateOperation timestamp={operation.created}/>}/>
      <RowOperation label={t('detailsStatus')} content={<OperationStatus status={operation.status}/>}/>
      {!!operation.fromAddress && <RowOperation label={t('detailsAddress')} content={<AddressOperation address={operation.fromAddress}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} isLast={true} content={<NetworkOperation coinId={coin.id} />} />}
    </ContainerOperation>
  );
}
