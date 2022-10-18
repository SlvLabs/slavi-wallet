import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {RowOperation} from './row-operation';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AddressOperation} from './address-operation';
import {NetworkOperation} from './network-operation';
import {TextOperation} from './text-operation';
import {ContainerOperation} from './container-operation';
import React, {useMemo} from 'react';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import {NftMovementsOperation} from './nft-movements-operation';

export interface OperationNftTransferProps {
  operation: OperationDetails;
}

export function OperationNftTransfer({operation}: OperationNftTransferProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);

  const movement = useMemo(() => operation.nft?.movements?.[0], [operation]);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
      <RowOperation label={t('detailsDate')} content={<DateOperation timestamp={operation.created}/>}/>
      <RowOperation label={t('detailsStatus')} content={<OperationStatus status={operation.status}/>}/>
      {!!movement?.fromAddress && <RowOperation label={t('detailsSentFrom')} content={<AddressOperation address={movement?.fromAddress}/>}/>}
      {!!movement?.toAddress && <RowOperation label={t('detailsReceivedTo')} content={<AddressOperation address={movement?.toAddress}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} content={<NetworkOperation coinId={coin.id} />} />}
      {!!operation.nft?.type && <RowOperation label={t('detailsTokenStandard')} isLast={true} content={<TextOperation text={operation.nft?.type} />} />}
      {!!operation.nft?.movements && operation.nft.movements.length > 0 && (
        <NftMovementsOperation operations={operation.nft.movements }/>
      )}
    </ContainerOperation>
  )
}
