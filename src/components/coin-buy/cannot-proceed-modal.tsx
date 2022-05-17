import useTranslation from '../../utils/use-translation';
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SolidButton from '../buttons/solid-button';
import BaseModal from '../modal/base-modal';
import theme from '../../theme';
import {ipDisconnect} from '../../assets/images';

export interface CannotProceedModalProps {
  visible: boolean;
  onSubmit: () => void;
}

export const CannotProceedModal = (props: CannotProceedModalProps) => {
  const {visible, onSubmit} = props;
  const {t} = useTranslation();

  return (
    <BaseModal visible={visible}>
      <View style={styles.imgContainer}>
        <Image source={ipDisconnect} style={styles.img}/>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('Cannot proceed')}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{t('Sorry, our service is not available in the location you are in')}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <SolidButton title={t('OK')} onPress={onSubmit} buttonStyle={styles.acceptButton} />
      </View>
    </BaseModal>
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
