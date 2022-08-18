import {Recipient} from './send-view';
import useTranslation from '../../utils/use-translation';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SolidButton from '../buttons/solid-button';
import BaseModal from '../modal/base-modal';
import theme from '../../theme';
import shrinkAddress from '../../utils/shrink-address';
import OutlineButton from '../buttons/outline-button';

export interface ConfirmationModalProps {
  visible: boolean;
  vouts: Recipient[];
  ticker: string;
  feeTicker: string;
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

const renderVout = (vout: Recipient, index: number, ticker: string) => (
  <View style={styles.vout} key={'conf_vouts_' + index}>
    <Text style={styles.voutAddress}>{shrinkAddress(vout.address, 9, 6, 20)}</Text>
    <Text style={styles.voutAmount}>{`${vout.amount} ${ticker}`}</Text>
  </View>
);

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {visible, onAccept, onCancel, ticker, feeTicker} = props;
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => setLoading(false), [visible]);

  const _onAccept = useCallback(() => {
    setLoading(true);
    onAccept();
  }, [onAccept]);

  return (
    <BaseModal visible={visible} showCloseIcon={true} onCancel={onCancel}>
      <View style={styles.content}>
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
          {props.vouts.map((vout, index) => renderVout(vout, index, ticker))}
        </View>
        {props.fee && (
          <View style={{...styles.feeContainer, ...props.feeContainerStyle}}>
            <Text style={{...styles.fee, ...props.feeStyle}}>
              {`${t('Fee will be')}`}
            </Text>
            <Text style={styles.feeValue}>{`${props.fee} ${feeTicker}`}</Text>
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
            containerStyle={styles.acceptContainer}
          />
          <OutlineButton
            title={t('Cancel')}
            onPress={onCancel}
            buttonStyle={{...styles.cancelButton, ...props.cancelButtonStyle}}
          />
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 32,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.4,
    color: theme.colors.white,
    textAlign: 'center',
  },
  voutsContainer: {
    width: '100%',
  },
  voutAddress: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray,
  },
  voutAmount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.green,
  },
  feeContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderGray,
    marginTop: 8,
  },
  fee: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray,
  },
  controlsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  acceptButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
  },
  feeValue: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  vout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 24,
  },
  acceptContainer: {
    marginBottom: 6,
  }
});

export default ConfirmationModal;
