import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import AddressSelectorModal, {
  AddressEntry,
} from '../modal/address-selector-modal';
import {useTranslation} from 'react-i18next';

export interface AddressSelectorProps {
  placeholder: string;
  addresses: AddressEntry[];
  onSelect: (index: number) => void;
  selectedAddress?: number;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  iconSize?: number;
  textStyle?: TextStyle;
}

const defaultIconSize = 16;

const AddressSelector = (props: AddressSelectorProps) => {
  const {t} = useTranslation();

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const showModal = useCallback(() => setModalIsVisible(true), []);
  const hideModal = useCallback(() => setModalIsVisible(false), []);

  let text = props.placeholder;
  let textStyle = {...styles.placeholder, ...props.placeholderStyle};

  if (
    typeof props.selectedAddress !== 'undefined' &&
    props.addresses[props.selectedAddress]
  ) {
    text =
      props.addresses[props.selectedAddress].name ||
      props.addresses[props.selectedAddress].address;
    textStyle = {...styles.text, ...props.textStyle};
  }

  return (
    <View>
      <TouchableOpacity
        style={{...styles.container, ...props.containerStyle}}
        onPress={showModal}>
        <Text style={textStyle}>{text}</Text>
        <Icon
          name={'down'}
          type={'antdesign'}
          size={props.iconSize || defaultIconSize}
        />
      </TouchableOpacity>
      <AddressSelectorModal
        addresses={props.addresses}
        visible={modalIsVisible}
        onCancel={hideModal}
        modalStyle={styles.modal}
        title={t('Select address')}
        onSelect={props.onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 22,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: theme.colorsOld.lightGray,
  },
  modal: {
    flex: 1,
    borderRadius: 0,
    margin: 0,
    padding: 16,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.2,
    color: theme.colorsOld.gray,
  },
});

export default AddressSelector;
