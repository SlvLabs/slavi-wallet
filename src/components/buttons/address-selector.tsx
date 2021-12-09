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
  addresses: AddressEntry[];
  ticker: string;
  onSelect: (index: number) => void;
  placeholder?: string;
  label?: string;
  selectedAddress?: number;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  textStyle?: TextStyle;
}

const defaultIconSize = 16;
const defaultIconColor = theme.colors.lightGray;

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
        <View>
          {props.label && (
            <View>
              <Text style={styles.label}>{props.label}</Text>
            </View>
          )}
          <Text style={textStyle}>{text}</Text>
        </View>
        <Icon
          name={'down'}
          type={'antdesign'}
          size={props.iconSize || defaultIconSize}
          color={props.iconColor || defaultIconColor}
        />
      </TouchableOpacity>
      <AddressSelectorModal
        addresses={props.addresses}
        visible={modalIsVisible}
        onCancel={hideModal}
        modalStyle={styles.modal}
        title={t('Select address')}
        onSelect={props.onSelect}
        ticker={props.ticker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
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
    lineHeight: 16,
    letterSpacing: 0.2,
    color: theme.colors.textLightGray1,
  },
  modal: {
    padding: 16,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray2,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray1,
    marginBottom: 8,
  },
});

export default AddressSelector;
