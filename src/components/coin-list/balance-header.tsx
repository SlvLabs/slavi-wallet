import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import SummaryBalanceElement from './summary-balance-element';
import theme from '../../theme';
import Layout from '../../utils/layout';
import {balanceHeader, dollarButton, downButton, upButton} from '../../assets/images';
import SimpleButton from '../buttons/simple-button';

export interface BalanceHeaderProps {
  fiatBalance: string;
  fiatTicker: string;
  fiatRound?: number;
  onSendClick?: () => void;
  onReceiveClick?: () => void;
  onBuyClick?: () => void;
}

const BalanceHeader = (props: BalanceHeaderProps) => {
  const {fiatBalance, fiatTicker, onSendClick, onReceiveClick, onBuyClick} = props;
  const fiatRound = props.fiatRound || 2;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <ImageBackground source={balanceHeader} style={styles.image}>
        <View style={styles.balances}>
          <SummaryBalanceElement
            balance={fiatBalance}
            round={fiatRound}
            ticker={fiatTicker}
            containerStyle={styles.mainBalance}
          />
        </View>
        <View style={styles.buttonsRow}>
          <SimpleButton
            title={t('Send')}
            onPress={onSendClick}
            leftIcon={<Image source={upButton} style={styles.buttonImage} />}
            containerStyle={styles.button}
            textStyle={styles.buttonText}
          />
          <SimpleButton
            title={t('Receive')}
            onPress={onReceiveClick}
            leftIcon={<Image source={downButton} style={styles.buttonImage} />}
            containerStyle={styles.button}
            textStyle={styles.buttonText}
          />
          <SimpleButton
            title={t('Buy')}
            onPress={onBuyClick}
            leftIcon={<Image source={dollarButton} style={styles.buttonImage} />}
            containerStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: theme.colors.balanceHeaderBackground,
  },
  image: {
    paddingTop: Layout.isSmallDevice ? 30 : 50,
    height: Layout.isSmallDevice ? 163 : 243,
  },
  linerGradient: {},
  leftGradient: {},
  rightGradient: {},
  balances: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    paddingLeft: Layout.isSmallDevice ? 18 : 34,
    paddingRight: Layout.isSmallDevice ? 18 : 34,
    justifyContent: 'space-around',
    marginTop: Layout.isSmallDevice ? 10 : 20,
    marginBottom: 40,
  },
  button: {
    width: 100,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: theme.colors.buttonv3,
    borderRadius: 38,
    alignItems: 'center',
  },
  mainBalance: {
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: theme.fonts.gilroy,
    textAlign: 'center',
    letterSpacing: 0.01,
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default BalanceHeader;
