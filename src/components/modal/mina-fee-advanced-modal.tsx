import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import useTranslation from '../../utils/use-translation';
import DecimalInput, {DecimalType} from '../controls/decimal-input';
import SolidButton from '../buttons/solid-button';
import BaseModal, {ModalProps} from './base-modal';
import theme from '../../theme';
import OutlineButton from '../buttons/outline-button';

export interface MinaFeeAdvancedModalProps extends ModalProps {
  onAccept: (gasPrice?: string, gasLimit?: string) => void;
  headerContainerStyle?: ViewStyle;
  headerStyle?: TextStyle;
  controlsContainerStyle?: ViewStyle;
  acceptButtonStyle?: ViewStyle;
  cancelButtonStyle?: ViewStyle;
}

const MinaFeeAdvancedModal = (props: MinaFeeAdvancedModalProps) => {
  const {t} = useTranslation();
  const [fee, setFee] = useState<string>();

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
        <Text style={{...styles.header, ...props.headerStyle}}>{t('minaAdvancedFeeHeader')}</Text>
      </View>
      <DecimalInput
        onChange={setFee}
        placeholder={t('minaAdvancedFeeLimitPlaceholder')}
        value={fee || ''}
        inputType={DecimalType.Real}
        containerStyle={styles.feeLimit}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <View
        style={{
          ...styles.controlsContainer,
          ...props.controlsContainerStyle,
        }}>
        <SolidButton
          title={t('Ok')}
          onPress={() => props.onAccept(fee)}
          buttonStyle={props.acceptButtonStyle}
          containerStyle={styles.acceptContainer}
        />
        <OutlineButton title={t('Cancel')} onPress={props.onCancel} buttonStyle={props.cancelButtonStyle} />
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
    textAlign: 'center',
  },
  controlsContainer: {
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
  },
  feeLimit: {
    paddingBottom: 16,
    backgroundColor: theme.colors.grayDark,
  },
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
  acceptContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default MinaFeeAdvancedModal;
