import {StyleSheet, View} from 'react-native';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import Layout from '../../utils/layout';
import GradientRoundButton from '../buttons/gradient-round-button';
import {buyBtn, exchangeBtn, receiveBtn, sendBtn} from '../../assets/images';

export interface CoinControlButtonsProps {
  onPressSend: () => void;
  onPressReceive: () => void;
  onPressExchange: () => void;
  onPressBuy: () => void;
  exchangeDisabled: boolean;
  buyEnabled: boolean;
}

const CoinControlButtons = (props: CoinControlButtonsProps) => {
  const {
    onPressExchange, onPressReceive,
    onPressBuy, onPressSend,
    exchangeDisabled, buyEnabled,
  } = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <GradientRoundButton
        label={t('Send')}
        onPress={onPressSend}
        iconName={'arrow-up1'}
        iconSize={18}
        image={sendBtn}
      />
      <GradientRoundButton
        label={t('Receive')}
        onPress={onPressReceive}
        iconName={'arrow-down'}
        iconSize={18}
        image={receiveBtn}
      />
      <GradientRoundButton
        label={t('Buy')}
        onPress={onPressBuy}
        iconName={'wallet-3'}
        disabled={!buyEnabled}
        image={buyBtn}
      />
      <GradientRoundButton
        label={t('Exchange')}
        onPress={onPressExchange}
        iconName={'exchange-2'}
        disabled={exchangeDisabled}
        image={exchangeBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: Layout.isSmallDevice ? 88 : 100,
  },
});

export default CoinControlButtons;
