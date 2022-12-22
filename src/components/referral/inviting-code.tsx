import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';

export interface InvitingCodeProps {
  code?: string;
}

export function InvitingCode({code}: InvitingCodeProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  const {t} = useTranslation();

  const onPress = useCallback(() => {
    if (code) {
      Clipboard.setString(code);
      setPressed(true);
    }
  }, [code]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!code}>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.copy}>{t(pressed ? 'copied' : 'Copy')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.gold2,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    alignItems: 'center',
  },
  code: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
    textAlign: 'center',
    flex: 5,
    marginRight: -43,
  },
  copy: {
    fontFamily: theme.fonts.default,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: theme.colors.darkGreen1,
    textTransform: 'uppercase',
    textAlign: 'right',
    flex: 1,
  },
});
