import React from 'react';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {RowOperation} from './row-operation';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AddressOperation} from './address-operation';
import {NetworkOperation} from './network-operation';
import {ContainerOperation} from './container-operation';

export interface OperationCallProps {
  operation: OperationDetails;
}

export function OperationCall({operation}: OperationCallProps) {
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
            type={Type.negative}
          />
        )}
      />}
      {!!operation.contract && <RowOperation label={t('detailsInteractedWith')} content={<AddressOperation address={operation.contract}/>}/>}
      {!!operation.fromAddress && <RowOperation label={t('detailsInteractedFrom')} content={<AddressOperation address={operation.fromAddress.address} addressName={operation.fromAddress.name}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} isLast={true} content={<NetworkOperation coinId={coin.id} />} />}
    </ContainerOperation>
  );
}
