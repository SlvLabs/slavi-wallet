import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {ContainerOperation} from './container-operation';
import {RowOperation} from './row-operation';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import React from 'react';

export interface OperationEarnDepositProps {
  operation: OperationDetails;
}

export function OperationEarnDeposit({operation}: OperationEarnDepositProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
      {operation.amount && (
        <RowOperation
          label={t('detailsAmount')}
          content={<AmountOperation amount={operation.amount} ticker={coin?.ticker} type={Type.negative} />}
        />
      )}
      {operation.commission && (
        <RowOperation
          label={t('detailsTransactionFee')}
          content={<AmountOperation amount={operation.commission} ticker={coin?.ticker} type={Type.negative} />}
        />
      )}
      <RowOperation label={t('detailsDate')} content={<DateOperation timestamp={operation.created} />} />
      <RowOperation label={t('detailsStatus')} content={<OperationStatus status={operation.status} />} />
    </ContainerOperation>
  );
}
