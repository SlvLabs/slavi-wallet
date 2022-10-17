import React from 'react';
import {ContainerOperation} from './container-operation';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {RowOperation} from './row-operation';
import useTranslation from '../../utils/use-translation';
import {Type} from '../operations/operation-amount';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AmountOperation} from './amount-operation';
import {AddressOperation} from './address-operation';
import {MovementsOperation} from './movements-operation';

export interface OperationDepositProps {
  operation: OperationDetails;
}

export function OperationDeposit({operation}: OperationDepositProps) {
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
      {!!operation.fromAddress && <RowOperation label={t('detailsSentFrom')} content={<AddressOperation address={operation.fromAddress}/>}/>}
      {!!operation.toAddress && <RowOperation label={t('detailsReceivedTo')} isLast={true} content={<AddressOperation address={operation.toAddress}/>}/>}
      {operation.to.length > 1 || operation.from.length > 1 && <MovementsOperation to={operation.to} from={operation.from} ticker={coin!.ticker}/>}
    </ContainerOperation>
  );
}
