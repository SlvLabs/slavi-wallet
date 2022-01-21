import {Recipient} from './send-view';
import useTranslation from '../../utils/use-translation';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SolidButton from '../buttons/solid-button';
import BaseModal from '../modal/base-modal';
import theme from '../../theme';

export interface ConfirmationModalProps {
  visible: boolean;
  vouts: Recipient[];
  fee?: string;
  onAccept: () => void;
  onCancel: () => void;
  headerContainerStyle?: ViewStyle;
  headerStyle?: TextStyle;
  voutsContainerStyle?: ViewStyle;
  voutAddressStyle?: TextStyle;
  voutAmountStyle?: TextStyle;
  feeContainerStyle?: ViewStyle;
  feeStyle?: TextStyle;
  controlsContainerStyle?: ViewStyle;
  acceptButtonStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
}

const DEFAULT_BEGIN_LETTERS_COUNT = 10;
const DEFAULT_END_LETTERS_COUNT = 10;
const DEFAULT_MAX_LENGTH = 35;

const shrinkAddress = (
  address: string,
  beginLettersCount?: number,
  endLettersCount?: number,
  maxLettersLength?: number,
) => {
  const beginCount = beginLettersCount || DEFAULT_BEGIN_LETTERS_COUNT;
  const endCount = endLettersCount || DEFAULT_END_LETTERS_COUNT;
  const maxLength = maxLettersLength || DEFAULT_MAX_LENGTH;

  if(address.length <= maxLength) {
    return address;
  }

  return `${address.slice(0, beginCount)}...${address.slice(-endCount)}`;
}

const renderVout = (vout: Recipient, index: number) => (
  <View style={styles.vout} key={'conf_vouts_' + index}>
    <Text style={styles.voutAddress}>{shrinkAddress(vout.address)}: </Text>
    <Text style={styles.voutAmount}>{vout.amount}</Text>
  </View>
);

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {visible, onAccept, onCancel} = props;
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => setLoading(false), [visible]);

  const _onAccept = useCallback(() => {
    setLoading(true);
    onAccept();
  }, [onAccept])

  return (
    <BaseModal visible={visible}>
      <View
        style={{
          ...styles.headerContainer,
          ...props.headerContainerStyle,
        }}>
        <Text style={{...styles.header, ...props.headerStyle}}>
          {t('Are you sure you want to send funds to the following addresses?')}
        </Text>
      </View>
      <View
        style={{
          ...styles.voutsContainer,
          ...props.voutsContainerStyle,
        }}>
        {props.vouts.map(renderVout)}
      </View>
      {props.fee && (
        <View style={{...styles.feeContainer, ...props.feeContainerStyle}}>
          <Text style={{...styles.fee, ...props.feeStyle}}>
            {`${t('Fee will be')}:`}
          </Text>
          <Text style={styles.feeValue}>{props.fee}</Text>
        </View>
      )}
      <View
        style={{
          ...styles.controlsContainer,
          ...props.controlsContainerStyle,
        }}>
        <SolidButton
          title={t('Ok')}
          onPress={_onAccept}
          buttonStyle={{...styles.acceptButton, ...props.acceptButtonStyle}}
          loading={loading}
        />
        <SolidButton
          title={t('Cancel')}
          onPress={onCancel}
          buttonStyle={{...styles.cancelButton, ...props.cancelButtonStyle}}
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 8,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.4,
    color: theme.colors.white,
  },
  voutsContainer: {
    paddingRight: 16,
  },
  voutAddress: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colors.white,
  },
  voutAmount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colors.white,
  },
  feeContainer: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  fee: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: theme.colors.white,
  },
  controlsContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    width: 88,
  },
  cancelButton: {
    width: 88,
  },
  feeValue: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: theme.colors.white,
    marginLeft: 8,
  },
  vout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ConfirmationModal;
