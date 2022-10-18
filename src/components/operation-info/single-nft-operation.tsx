import React, {useMemo} from 'react';
import {OperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {RowOperation} from './row-operation';
import {AmountOperation} from './amount-operation';
import {Type} from '../operations/operation-amount';
import {DateOperation} from './date-operation';
import OperationStatus from '../operations/operation-status';
import {AddressOperation} from './address-operation';
import {ContainerOperation} from './container-operation';
import {NetworkOperation} from './network-operation';
import {TextOperation} from './text-operation';
import NftImage from '../nft/nft-image';
import {StyleSheet} from 'react-native';
import Layout from '../../utils/layout';

export interface SingleNftOperationProps {
  operation: OperationDetails;
}

export function SingleNftOperation({operation}: SingleNftOperationProps) {
  const {t} = useTranslation();

  const coin = useCoinDetails(operation.coin);

  const movement = useMemo(() => operation.nft?.movements?.[0], [operation]);

  return (
    <ContainerOperation explorerLink={operation.explorerLink}>
      <NftImage image={movement?.image} imageStyle={styles.image} containerStyle={styles.imageContainer} />
      {movement?.amount && (
        <RowOperation
          label={t('detailsAmount')}
          content={(
            <AmountOperation
              amount={movement.amount}
              ticker={movement.name}
              type={Type.positive}
            />
          )}
        />)}
      <RowOperation label={t('detailsDate')} content={<DateOperation timestamp={operation.created}/>}/>
      <RowOperation label={t('detailsStatus')} content={<OperationStatus status={operation.status}/>}/>
      {!!movement?.fromAddress && <RowOperation label={t('detailsSentFrom')} content={<AddressOperation address={movement?.fromAddress}/>}/>}
      {!!movement?.toAddress && <RowOperation label={t('detailsReceivedTo')} content={<AddressOperation address={movement?.toAddress}/>}/>}
      {!!coin?.id && <RowOperation label={t('detailsBlockchain')} content={<NetworkOperation coinId={coin.id} />} />}
      {!!operation.nft?.type && <RowOperation label={t('detailsTokenStandard')} isLast={true} content={<TextOperation text={operation.nft?.type} />} />}
    </ContainerOperation>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Layout.isSmallDevice ? 160 : 250,
    height: Layout.isSmallDevice ? 160 : 250,
  },
  imageContainer: {
    marginBottom: 27,
  }
});
