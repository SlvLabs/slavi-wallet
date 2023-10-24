import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SolidButton from '../buttons/solid-button';
import BaseAuthedModal from '../modal/base-authorized-modal';
import theme from '../../theme';
import {ipDisconnect} from '../../assets/images';

export interface CannotProceedModalProps {
  visible: boolean;
  onSubmit: () => void;
  text: string;
  showImg?: boolean;
}

export const CannotProceedModal = (props: CannotProceedModalProps) => {
  const {visible, onSubmit, showImg, text} = props;
  const {t} = useTranslation();

  return (
    <BaseAuthedModal visible={visible}>
      {showImg && (
        <View style={styles.imgContainer}>
          <Image source={ipDisconnect} style={styles.img} />
        </View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('Cannot proceed')}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{t(text as unknown as TranslationsKey)}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <SolidButton title={t('OK')} onPress={onSubmit} buttonStyle={styles.acceptButton} />
      </View>
    </BaseAuthedModal>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  img: {
    width: 80,
    height: 80,
  },
  headerContainer: {
    paddingRight: 38,
    paddingLeft: 38,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: theme.colors.white,
  },
  bodyContainer: {
    marginTop: 8,
    paddingRight: 38,
    paddingLeft: 38,
  },
  body: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  controlsContainer: {
    marginTop: 36,
  },
  acceptButton: {
    width: '100%',
  },
});
