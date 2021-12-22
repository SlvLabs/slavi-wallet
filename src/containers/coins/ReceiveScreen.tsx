import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
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
import theme from '../../theme';
import AddressView from '../../components/coin-receive/address-view';
import Layout from '../../utils/layout';

const ReceiveScreen = () => {
  const route = useRoute<CoinReceiveRouteProps>();
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
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <CoinBalanceHeader
          logo={data.logo}
          balance={data.balance}
          name={data.name}
          cryptoBalance={data.cryptoBalance}
          cryptoTicker={data.crypto}
          fiatBalance={data.fiatBalance}
          fiatTicker={data.fiat}
          type={data.type}
        />
        <AddressesCarousel
          addresses={addresses.map(element => ({
            address: element.address,
            name: element.name,
            id: element.id,
          }))}
          qrSize={160}
          onDataChange={onQrChange}
          amount={amount}
          coin={specService.getSpec(coin)?.bip21Name || ''}
          onSnapToItem={onSnapToItem}
          onEdit={editRecvAddr}
          ref={ref}
        />
        <View style={styles.address}>
          <AddressView address={address || ''} name={addressName} />
        </View>
        <ReceiveControlButtons
          address={address || ''}
          dataToShare={qr}
          editAddress={editRecvAddr}
          editAmount={onAmountChange}
          containerStyle={styles.receiveControlButtons}
          addressName={addressName}
        />
        <EditAddressButton
          title={'Get new address'}
          nameInputLabel={'Address name'}
          onSubmit={getNewRecvAddr}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  receiveControlButtons: {
    marginTop: 24,
  },
  address: {
    marginTop: 16,
    marginBottom: Layout.isSmallDevice ? 8 : 24,
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 100,
  }
});

export default ReceiveScreen;
