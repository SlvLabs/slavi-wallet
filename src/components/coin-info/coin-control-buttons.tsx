import SolidButton from '../buttons/solid-button';
import Button from '../buttons/button';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import OutlineButton from '../buttons/outline-button';

export interface CoinControlButtonsProps {
  onPressSend: () => void;
  onPressReceive: () => void;
  onPressExchange: () => void;
}

const CoinControlButtons = (props: CoinControlButtonsProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <SolidButton
        title={t('Send')}
        onPress={props.onPressSend}
        buttonStyle={styles.button}
      />
      <OutlineButton
        title={t('Receive')}
        onPress={props.onPressReceive}
        buttonStyle={styles.button}
      />
      <Button
        title={t('Exchange')}
        disabled={true}
        onPress={props.onPressExchange}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  button: {
    width: 88,
  },
});

export default CoinControlButtons;
