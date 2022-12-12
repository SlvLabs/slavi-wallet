import shrinkAddress from '../../utils/shrink-address';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import theme from '../../theme';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';

export interface AddressOperationProps {
  address: string;
  addressName?: string;
  style?: TextStyle;
}

export function AddressOperation({address, style, addressName}: AddressOperationProps) {
  const {t} = useTranslation();

  const copy = useCallback(() => {
    Clipboard.setString(address);
    Toast.show(t('Copied to clipboard'));
  }, []);

  return (
    <TouchableOpacity onPress={copy}>
      <Text style={{...styles.text, ...style}}>{addressName || shrinkAddress(address, 5, 5,20)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.borderGreen,
  }
});
