import React from 'react';
import BaseModal from '../modal/base-modal';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from '../spinner';
import theme from '../../theme';
import SolidButton from '../buttons/solid-button';

export interface HaltModalProps {
  onAccept: () => void;
  textHeader: string;
  textDescription: string;
  textButton: string;
  visible?: boolean;
  onCancel?: () => void;
}

export default function HaltModal({
  visible,
  onCancel,
  onAccept,
  textButton,
  textDescription,
  textHeader,
}: HaltModalProps) {
  return (
    <BaseModal visible={visible} onCancel={onCancel} showCloseIcon={false}>
      <View style={styles.container}>
        <Spinner />
        <Text style={styles.header}>{textHeader}</Text>
        <Text style={styles.description}>{textDescription}</Text>
      </View>
      <SolidButton title={textButton} onPress={onAccept} />
    </BaseModal>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 31,
    color: theme.colors.white,
    paddingBottom: 8,
    alignSelf: 'center',
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textLightGray,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 36,
  },
});
