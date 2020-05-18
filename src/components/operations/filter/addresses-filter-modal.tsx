import {useTranslation} from 'react-i18next';
import FullScreenModal from '../../modal/full-screen-modal';
import {ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import FullFilterAddressList from './full-filter-address-list';
import {
  AddressDataInBook,
  AddressTypeInBook,
  useAllAddressesByType,
} from '@slavi/wallet-core/src/store/modules/address-book/selectors';
import SearchInput from '../../controls/search-input';
import theme from '../../../theme';

export interface AddressesFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  types: AddressTypeInBook[];
  onSubmit: (addresses: number[]) => void;
  selectedAddresses: number[];
}

/**
 * Модалка позволяет выбрать сразу несколько адресов из адресной книги
 *
 * Отложено до реализации адресной книги
 */
const AddressesFilterModal = (props: AddressesFilterModalProps) => {
  const {selectedAddresses: initialSelectedAddresses, onSubmit} = props;

  const {t} = useTranslation();

  const addresses = useAllAddressesByType(props.types);

  const [filter, setFilter] = useState<string>('');
  const [filteredAddresses, setFilteredAddresses] =
    useState<AddressDataInBook[]>(addresses);
  const [selectedAddresses, setSelectedAddresses] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    setSelectedAddresses(
      Object.fromEntries(
        initialSelectedAddresses.map(address => [address, true]),
      ),
    );
  }, [initialSelectedAddresses]);

  useEffect(() => {
    if (filter) {
      setFilteredAddresses(
        addresses.filter(
          element =>
            element.address.search(new RegExp(filter, 'i')) !== -1 ||
            (element.name &&
              element.name.search(new RegExp(filter, 'i')) !== -1),
        ),
      );
    } else {
      setFilteredAddresses(addresses);
    }
  }, [addresses, filter]);

  const submit = useCallback(() => {
    const selected: number[] = [];
    Object.entries(selectedAddresses).forEach(([key, value]) => {
      if (value) {
        selected.push(+key);
      }
    });
    onSubmit(selected);
  }, [onSubmit, selectedAddresses]);

  const onCoinPress = (address: number) => {
    setSelectedAddresses({
      ...selectedAddresses,
      [address]: !selectedAddresses?.[address],
    });
  };

  return (
    <FullScreenModal
      visible={props.visible}
      onCancel={props.onCancel}
      title={t('Select addresses')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colorsOld.gray}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <SearchInput
          containerStyle={styles.search}
          placeholder={t('Search...')}
          onChange={setFilter}
          value={filter}
        />
        <FullFilterAddressList
          addresses={filteredAddresses}
          types={props.types}
          containerStyle={styles.addressesList}
          elementStyle={styles.addressElement}
          onSelect={onCoinPress}
          selectedAddresses={selectedAddresses}
        />
      </ScrollView>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  search: {
    margin: 16,
  },
  addressesList: {
    margin: 16,
  },
  addressElement: {
    backgroundColor: theme.colorsOld.white,
  },
});

export default AddressesFilterModal;
