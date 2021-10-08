import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import DecimalInput, {DecimalType} from '../controls/decimal-input';
import SolidButton from '../buttons/solid-button';
import Button from '../buttons/button';
import BaseModal, {ModalProps} from './base-modal';
import theme from '../../theme';

export interface EthFeeAdvancedModalProps extends ModalProps {
  onAccept: (gasPrice?: string, gasLimit?: string) => void;
  defaultGasPrice?: string;
  defaultGasLimit?: string;
  headerContainerStyle?: ViewStyle;
  headerStyle?: TextStyle;
  controlsContainerStyle?: ViewStyle;
  acceptButtonStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
}

const EthFeeAdvancedModal = (props: EthFeeAdvancedModalProps) => {
  const {t} = useTranslation();
  const [gasPrice, setGasPrice] = useState<string>();
  const [gasLimit, setGasLimit] = useState<string>();

  return (
    <BaseModal
      visible={props.visible}
      onCancel={props.onCancel}
      modalStyle={props.modalStyle}
      contentStyle={props.contentStyle}>
      <View
        style={{
          ...styles.headerContainer,
          ...props.headerContainerStyle,
        }}>
        <Text style={{...styles.header, ...props.headerStyle}}>
          {t('Set the gas price and gas limit at your discretion')}
        </Text>
      </View>
      <DecimalInput
        onChange={setGasPrice}
        placeholder={t('Gas price (in Gwei)')}
        value={gasPrice || props.defaultGasPrice}
        inputType={DecimalType.Integer}
        containerStyle={styles.gasPrice}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <DecimalInput
        onChange={setGasLimit}
        placeholder={t('Gas limit')}
        value={gasLimit || props.defaultGasLimit}
        inputType={DecimalType.Integer}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <View
        style={{
          ...styles.controlsContainer,
          ...props.controlsContainerStyle,
        }}>
        <Button
          title={t('Cancel')}
          onPress={props.onCancel}
          buttonStyle={{...styles.cancelButton, ...props.cancelButtonStyle}}
        />

        <SolidButton
          title={t('Ok')}
          onPress={() => props.onAccept(gasPrice, gasLimit)}
          buttonStyle={{...styles.acceptButton, ...props.acceptButtonStyle}}
          containerStyle={styles.acceptButtonContainer}
        />
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    paddingBottom: 8,
    paddingTop: 8,
  },
  header: {
    color: theme.colors.textLightGray,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 16,
    paddingBottom: 16,
  },
  acceptButton: {
    width: 120,
    borderRadius: 8,
  },
  acceptButtonContainer: {
    borderRadius: 8,
  },
  cancelButton: {
    width: 120,
    borderRadius: 8,
    backgroundColor: theme.colors.cardBackground3
  },
  gasPrice: {
    paddingBottom: 16,
    backgroundColor: theme.colors.grayDark,
  },
  gasLimit: {},
  inputStyle: {
    flex: 0,
  },
  inputContainerStyle: {
    backgroundColor: theme.colors.dark,
  },
  content: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});

export default EthFeeAdvancedModal;
