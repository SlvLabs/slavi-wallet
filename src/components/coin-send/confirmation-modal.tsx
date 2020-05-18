import {Recipient} from './send-view';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
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

const renderVout = (vout: Recipient, index: number) => (
  <View style={styles.vout} key={'conf_vouts_' + index}>
    <Text style={styles.voutAddress}>{vout.address}: </Text>
    <Text style={styles.voutAmount}>{vout.amount}</Text>
  </View>
);

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {t} = useTranslation();
  return (
    <BaseModal visible={props.visible}>
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
          onPress={props.onAccept}
          buttonStyle={{...styles.acceptButton, ...props.acceptButtonStyle}}
        />
        <SolidButton
          title={t('Cancel')}
          onPress={props.onCancel}
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
    lineHeight: 16,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
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
    color: theme.colorsOld.gray,
  },
  voutAmount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colorsOld.gray,
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
    color: theme.colorsOld.gray,
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
    color: theme.colorsOld.gray,
    marginLeft: 8,
  },
  vout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ConfirmationModal;
