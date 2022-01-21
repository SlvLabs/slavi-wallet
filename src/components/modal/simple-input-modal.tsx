import {StyleSheet, ViewStyle} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import SolidButton from '../buttons/solid-button';
import SimpleInput from '../controls/simple-input';
import BaseModal, {ModalProps} from './base-modal';
import theme from '../../theme';

export interface SimpleInputModalProps extends ModalProps {
  onSubmit: (name?: string) => void;
  label?: string;
  value?: string;
  inputStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
}

const SimpleInputModal = (props: SimpleInputModalProps) => {
  const {t} = useTranslation();

  const [value, setName] = useState<string | undefined>(props.value);

  const _onSubmit = useCallback(() => {
    if (props.onSubmit) {
      props.onSubmit(value);
    }
  }, [value, props]);

  useEffect(() => setName(props.value), [props.value]);

  return (
    <BaseModal
      visible={props.visible}
      onCancel={props.onCancel}
      modalStyle={props.modalStyle}
      contentStyle={props.contentStyle}>
      <SimpleInput
        onChange={setName}
        label={props.label}
        value={value}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainerStyle}
      />
      <SolidButton
        onPress={_onSubmit}
        title={t('Save')}
        buttonStyle={{...styles.button, ...props.buttonStyle}}
      />
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  button: {},
  input: {
    flex: 0
  },
  inputContainerStyle: {
    marginBottom: 24,
    backgroundColor: theme.colors.dark
  }
});

export default SimpleInputModal;
