import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextStyle, ScrollView} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import {useTranslation} from 'react-i18next';
import BaseModal, {ModalProps} from './base-modal';
import SimpleInput from '../controls/simple-input';
import theme from '../../theme';
import InnerAddressList from '../address-book/inner-address-list';

export interface AddressEntry {
  address: string;
  name?: string;
  balance?: string;
}

export interface AddressSelectorModalProps extends ModalProps {
  addresses: AddressEntry[];
  ticker: string;
  onSelect: (index: number) => void;
  onCancel: () => void;
  title?: string;
  iconSize?: number;
  iconColor?: string;
  titleStyle?: TextStyle;
}

const AddressSelectorModal = (props: AddressSelectorModalProps) => {
  const {addresses} = props;
  const [search, setSearch] = useState<string>('');
  const [filteredAddresses, setFilteredAddresses] = useState<AddressEntry[]>(addresses);

  const {t} = useTranslation();

  const onSelect = useCallback(
    (index: number) => {
      props.onSelect(index);
      props.onCancel();
    },
    [props],
  );

  useEffect(() => setFilteredAddresses(addresses.filter((element) =>
      element.address.toLowerCase().includes(search.toLowerCase()) ||
      element.name?.toLowerCase()?.includes(search.toLowerCase())
    )), [addresses, search])

  return (
    <BaseModal
      visible={props.visible}
      modalStyle={props.modalStyle}
      contentStyle={props.contentStyle}
      showCloseIcon={true}
      onCancel={props.onCancel}>
      <View style={styles.header}>
        {props.title && (
          <Text style={{...styles.title, ...props.titleStyle}}>
            {props.title}
          </Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        <SimpleInput
          value={search}
          onChange={setSearch}
          placeholder={t('Search...')}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor={theme.colors.textLightGray3}
          icon={<CustomIcon name={'search'} size={22} color={theme.colors.textLightGray1}
          />}
        />
      </View>
      <ScrollView style={styles.scroll}>
        <InnerAddressList
          addresses={filteredAddresses}
          onPressElement={onSelect}
          placeholderTextStyle={styles.searchPlaceholder}
          ticker={props.ticker}
        />
      </ScrollView>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  searchContainer: {
    padding: 8,
    paddingBottom: 16,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: theme.colors.white,
    flex: 12,
    textAlign: 'center',
  },
  icon: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: theme.colors.cardBackground3,
  },
  searchPlaceholder: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: theme.colors.textLightGray,
    flex: 12,
    textAlign: 'center',
  },
  scroll: {
    height: '60%',
  }
});

export default AddressSelectorModal;
