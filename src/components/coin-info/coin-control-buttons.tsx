import SolidButton from '../buttons/solid-button';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import OutlineButton from '../buttons/outline-button';
import Layout from '../../utils/layout';

export interface CoinControlButtonsProps {
  onPressSend: () => void;
  onPressReceive: () => void;
  onPressExchange: () => void;
  onPressBuy: () => void;
  exchangeDisabled: boolean;
}

const CoinControlButtons = (props: CoinControlButtonsProps) => {
  const {
    onPressExchange, onPressReceive,
    onPressBuy, onPressSend,
    exchangeDisabled,
  } = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <SolidButton
        title={t('Send')}
        onPress={onPressSend}
        buttonStyle={styles.button}
      />
      <OutlineButton
        title={t('Receive')}
        onPress={onPressReceive}
        buttonStyle={styles.button}
      />
      <OutlineButton
        title={t('Buy')}
        onPress={onPressBuy}
        buttonStyle={styles.button}
      />
      <OutlineButton
        title={t('Exchange')}
        disabled={exchangeDisabled}
        onPress={onPressExchange}
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
    width: Layout.isSmallDevice ? 88 : 100,
  },
});

export default CoinControlButtons;
