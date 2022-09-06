import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextStyle, ScrollView, TouchableOpacity} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import useTranslation from '../../utils/use-translation';
import {ModalProps} from './base-modal';
import SimpleInput from '../controls/simple-input';
import theme from '../../theme';
import InnerAddressList from '../address-book/inner-address-list';
import FullScreenModal from './full-screen-modal';
import Layout from '../../utils/layout';

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
  const {onCancel} = props;

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
    <FullScreenModal
      visible={!!props.visible}
      onCancel={props.onCancel}
      hideCloseButton={true}>
      <View style={styles.headerView}>
        <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onCancel}>
          <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
        {!!props.title && <Text style={styles.header}>{props.title}</Text>}
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
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    paddingTop: 8,
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
    paddingRight: 16,
    paddingLeft: 16,
  },
  header: {
    flex: 8,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  backButton: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});

export default AddressSelectorModal;
