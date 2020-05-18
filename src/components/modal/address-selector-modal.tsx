import React, {useCallback} from 'react';
import {StyleSheet, View, Text, TextStyle} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import {useTranslation} from 'react-i18next';
import BaseModal, {ModalProps} from './base-modal';
import SimpleInput from '../controls/simple-input';
import theme from '../../theme';
import InnerAddressList from '../address-book/inner-address-list';

export interface AddressEntry {
  address: string;
  name?: string;
}

export interface AddressSelectorModalProps extends ModalProps {
  addresses: AddressEntry[];
  onSelect: (index: number) => void;
  onCancel: () => void;
  title?: string;
  iconSize?: number;
  iconColor?: string;
  titleStyle?: TextStyle;
}

const defaultIconSize = 24;
const defaultIconColor = theme.colorsOld.lightGray;

const AddressSelectorModal = (props: AddressSelectorModalProps) => {
  const {t} = useTranslation();

  const onSelect = useCallback(
    (index: number) => {
      props.onSelect(index);
      props.onCancel();
    },
    [props],
  );

  return (
    <BaseModal
      visible={props.visible}
      modalStyle={props.modalStyle}
      contentStyle={props.contentStyle}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <CustomIcon
            name={'close'}
            onPress={props.onCancel}
            size={props.iconSize || defaultIconSize}
            color={props.iconColor || defaultIconColor}
          />
        </View>
        {props.title && (
          <Text style={{...styles.title, ...props.titleStyle}}>
            {props.title}
          </Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        <SimpleInput placeholder={t('Search...')} />
      </View>
      <InnerAddressList addresses={props.addresses} onPressElement={onSelect} />
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
    paddingBottom: 16,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
    flex: 12,
    textAlign: 'center',
  },
  icon: {
    flex: 1,
  },
});

export default AddressSelectorModal;
