import React from 'react';
import SimpleInput, {SimpleInputProps} from './simple-input';
import {useTranslation} from 'react-i18next';
import {useCallback} from 'react';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';

export interface InsertableInputProps extends SimpleInputProps {}

export default function InsertableInput(props: InsertableInputProps) {
  const {onChange} = props;

  const {t} = useTranslation();

  const paste = useCallback(async () => {
    const val = await Clipboard.getString();
    onChange?.(val)
  }, [onChange]);

  return <SimpleInput {...props} buttonText={t('Paste')} onButtonPress={paste} />
}
