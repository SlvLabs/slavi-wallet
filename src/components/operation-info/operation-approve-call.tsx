import React from 'react';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {ContainerOperation} from './container-operation';
import {RowOperation} from './row-operation';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {AddressOperation} from './address-operation';
import {NetworkOperation} from './network-operation';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';

export interface OperationApproveCallProps {
  operation: OperationDetails;
}

export function OperationApproveCall({operation}: OperationApproveCallProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
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
      {!!operation.contract && <RowOperation label={t('detailsInteractedWith')} content={<AddressOperation address={operation.contract}/>}/>}
      {!!operation.fromAddress && <RowOperation label={t('detailsInteractedFrom')} content={<AddressOperation address={operation.fromAddress}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} isLast={true} content={<NetworkOperation coinId={coin.id} />} />}
    </ContainerOperation>
  );
}
