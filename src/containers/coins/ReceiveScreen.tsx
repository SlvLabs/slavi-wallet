import {StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/core';
import {CoinReceiveRouteProps} from '../../navigation/CoinsStack';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import ReceiveControlButtons from '../../components/coin-receive/receive-control-buttons';
import {useAllInnerAddressesSelector} from '@slavi/wallet-core/src/store/modules/address-book/selectors';
import EditAddressButton from '../../components/coin-receive/edit-address-button';
import AddressesCarousel, {AddressesCarouselHandle} from '../../components/coin-receive/addresses-carousel';
import {useCoinSpecsService, useInnerAddressBookService} from '@slavi/wallet-core';
import AddressView from '../../components/coin-receive/address-view';
import Layout from '../../utils/layout';
import useTranslation from '../../utils/use-translation';
import ScrollableScreen from '../../components/scrollable-screen';

const ReceiveScreen = () => {
  const route = useRoute<CoinReceiveRouteProps>();
  const {t} = useTranslation();

  const coin = route.params?.coin;
  if (!coin) {
    throw new Error('Unknown coin for details display');
  }
  const data = useCoinDetails(coin);
  if (!data) {
    throw new Error('Unknown coin for details display');
  }

  const [amount, setAmount] = useState<string>('');
  const [qr, setQr] = useState<string | null>(null);

  const specService = useCoinSpecsService();

  const addresses = useAllInnerAddressesSelector(coin).sort(
    (a, b) => b.shift - a.shift,
  );

  const [id, setId] = useState<number | undefined>(addresses?.[0].id);
  const [address, setAddress] = useState<string | undefined>(addresses?.[0].address);
  const [addressName, setAddressName] = useState<string | undefined>(addresses?.[0].name);

  const innerBookService = useInnerAddressBookService();

  const ref = useRef<AddressesCarouselHandle>(null);

  const onAmountChange = useCallback((value?: string) => {
    setAmount(value || '0');
  }, []);

  const onQrChange = useCallback((qrData: string | null) => {
    setQr(qrData);
  }, []);

  const onSnapToItem = useCallback((_address?: string, _id?: number, _addressName?: string) => {
    setAddress(_address);
    setAddressName(_addressName);
    setId(_id);
  }, []);

  const getNewRecvAddr = useCallback(
    async (name?: string) => {
      const newEntity = await innerBookService.getNewRecvAddress(coin, name?.trim() || '');

      if(ref.current) {
        ref.current.snapById(newEntity.id);
      }
    },
    [coin, innerBookService],
  );

  const editRecvAddr = useCallback(
    async (name?: string) => {
      if (id && address) {
        const newEntity = await innerBookService.createOrUpdateEntry({id, address, name: name?.trim() || '', coin});

        if(ref.current) {
          ref.current.snapById(newEntity.id);
        }
      }
    },
    [address, coin, id, innerBookService],
  );

  return (
    <ScrollableScreen title={t('Receive coins')} contentStyle={styles.container}>
        <CoinBalanceHeader
          logo={data.logo}
          balance={data.balance}
          name={data.name}
          cryptoBalance={data.cryptoBalance}
          cryptoTicker={data.crypto}
          fiatBalance={data.fiatBalance}
          fiatTicker={data.fiat}
          type={data.type}
          ticker={data.ticker}
        />
        <AddressesCarousel
          addresses={addresses.map(element => ({
            address: element.address,
            name: element.name,
            id: element.id,
          }))}
          qrSize={Layout.isSmallDevice ? 150 : 170}
          onDataChange={onQrChange}
          amount={amount}
          coin={specService.getSpec(coin)?.bip21Name || ''}
          onSnapToItem={onSnapToItem}
          onEdit={editRecvAddr}
          ref={ref}
        />
        <AddressView address={address || ''} name={addressName} ticker={data.ticker} containerStyle={styles.address}/>
        <ReceiveControlButtons
          address={address || ''}
          dataToShare={qr}
          editAddress={editRecvAddr}
          editAmount={onAmountChange}
          containerStyle={styles.receiveControlButtons}
          addressName={addressName}
        />
        <EditAddressButton
          title={t('Get new address')}
          nameInputLabel={'Address name'}
          onSubmit={getNewRecvAddr}
        />
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: Layout.isSmallDevice ? 24 : 32,
  },
  receiveControlButtons: {
    marginTop: Layout.isSmallDevice ? 12 : 24,
    marginBottom: Layout.isSmallDevice ? 12 : 16,
  },
  address: {
    marginTop: Layout.isSmallDevice ? 24 : 32,
  }
});

export default ReceiveScreen;
