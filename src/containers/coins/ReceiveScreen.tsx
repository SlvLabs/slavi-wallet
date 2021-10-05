import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useRoute} from '@react-navigation/core';
import {CoinReceiveRouteProps} from '../../navigation/CoinsStack';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import ReceiveControlButtons from '../../components/coin-receive/receive-control-buttons';
import {useAllInnerAddressesSelector} from '@slavi/wallet-core/src/store/modules/address-book/selectors';
import EditAddressButton from '../../components/coin-receive/edit-address-button';
import AddressesCarousel from '../../components/coin-receive/addresses-carousel';
import {useInnerAddressBookService} from '@slavi/wallet-core';
import theme from '../../theme';

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

  const [address, setAddress] = useState<string | undefined>();
  const [id, setId] = useState<number | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [qr, setQr] = useState<string | null>(null);

  const addresses = useAllInnerAddressesSelector(coin).sort(
    (a, b) => b.shift - a.shift,
  );

  const innerBookService = useInnerAddressBookService();

  // TODO: add validation
  const onAmountChange = useCallback((value?: string) => {
    setAmount(value || '0');
  }, []);

  const onQrChange = useCallback((qrData: string | null) => {
    setQr(qrData);
  }, []);

  const getNewRecvAddr = useCallback(
    (name?: string) => {
      innerBookService.getNewRecvAddress(coin, name);
    },
    [coin, innerBookService],
  );

  const editRecvAddr = useCallback(
    (name?: string) => {
      if (id && address) {
        if (!name) {
          name = '';
        }
        innerBookService.createOrUpdateEntry({id, address, name, coin});
      }
    },
    [address, coin, id, innerBookService],
  );

  const onSnapToItem = useCallback((_address?: string, _id?: number) => {
    setAddress(_address);
    setId(_id);
  }, []);

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
        />
        <AddressesCarousel
          addresses={addresses.map(element => ({
            address: element.address,
            name: element.name,
            id: element.id,
          }))}
          qrSize={200}
          onDataChange={onQrChange}
          amount={amount}
          coin={coin}
          onSnapToItem={onSnapToItem}
          onEdit={editRecvAddr}
        />
        {/* TODO: check address type */}
        <ReceiveControlButtons
          address={address || ''}
          dataToShare={qr}
          editAddress={editRecvAddr}
          editAmount={onAmountChange}
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
    backgroundColor: theme.colorsOld.white,
  },
});

export default ReceiveScreen;
