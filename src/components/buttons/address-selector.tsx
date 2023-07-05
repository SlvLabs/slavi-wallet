import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {StyleSheet, ViewStyle, Text, TextStyle, TouchableOpacity, View} from 'react-native';
import theme from '../../theme';
import AddressSelectorModal, {AddressEntry} from '../modal/address-selector-modal';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../custom-icon/custom-icon';

export interface AddressSelectorProps {
  addresses: AddressEntry[];
  ticker: string;
  onSelect: (index: number) => void;
  placeholder?: string;
  label?: string;
  selectedAddress?: number;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  children?: ReactNode;
  baseTicker?: string;
  hideBalances?: boolean;
}

const AddressSelector = (props: AddressSelectorProps) => {
  const {t} = useTranslation();

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const showModal = useCallback(() => setModalIsVisible(true), []);
  const hideModal = useCallback(() => setModalIsVisible(false), []);

  let text = props.placeholder;
  let textStyle = {...styles.placeholder, ...props.placeholderStyle};

  if (typeof props.selectedAddress !== 'undefined' && props.addresses[props.selectedAddress]) {
    text = props.addresses[props.selectedAddress].name || props.addresses[props.selectedAddress].address;
    textStyle = {...styles.text, ...props.textStyle};
  }

  const containerStyle = useMemo(
    () =>
      props.disabled
        ? {...styles.container, ...props.containerStyle, ...styles.disabledContainer}
        : {...styles.container, ...props.containerStyle},
    [props.containerStyle, props.disabled],
  );

  return (
    <View>
      <TouchableOpacity style={containerStyle} onPress={showModal} disabled={props.disabled}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            {props.label && (
              <View>
                <Text style={styles.label}>{props.label}</Text>
              </View>
            )}
            <Text style={textStyle} numberOfLines={1} ellipsizeMode={'middle'}>
              {text}
            </Text>
          </View>
          <CustomIcon name={'arrow'} size={18} color={theme.colors.textLightGray1} style={styles.icon} />
        </View>
        {/*{props.children}*/}
      </TouchableOpacity>
      <AddressSelectorModal
        addresses={props.addresses}
        visible={modalIsVisible}
        onCancel={hideModal}
        modalStyle={styles.modal}
        title={t('Select address')}
        onSelect={props.onSelect}
        ticker={props.ticker}
        baseTicker={props.baseTicker}
        hideBalances={props.hideBalances}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
  },
  row: {
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
  },
  disabledContainer: {
    backgroundColor: theme.colors.lightBackground,
  },
  textContainer: {
    paddingRight: 20,
  },
  icon: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
    marginRight: 8,
  },
});

export default AddressSelector;
