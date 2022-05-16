import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import SummaryBalanceElement from './summary-balance-element';
import theme from '../../theme';
import Layout from '../../utils/layout';
import {balanceHeader, downButton, upButton} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import SimpleButton from '../buttons/simple-button';

export interface BalanceHeaderProps {
  fiatBalance: string;
  fiatTicker: string;
  fiatRound?: number;
  onSendClick?: () => void;
  onReceiveClick?: () => void;
}

const BalanceHeader = (props: BalanceHeaderProps) => {
  const {fiatBalance, fiatTicker, onSendClick, onReceiveClick} = props;
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
          <View style={styles.profitBlock}>
            <Text style={styles.subLabel}>{t('Profit 24h')}</Text>
            <View style={styles.profitRow}>
              <LinearGradient style={styles.profitFiat} {...theme.gradients.button}>
                <Text style={styles.profitFiatText}>{t('Coming soon')}</Text>
              </LinearGradient>
              <View style={styles.profitPercent}>
                <Text style={styles.profitPercentText}>0.00%</Text>
              </View>
            </View>
          </View>
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
    paddingTop: 50,
  },
  linerGradient: {},
  leftGradient: {},
  rightGradient: {},
  balances: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 0.4,
    lineHeight: 14,
    color: theme.colors.quiteTransparent,
    textTransform: 'uppercase',
  },
  subLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.quiteTransparent,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    textAlignVertical: 'center',
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chart: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartImage: {
    width: Layout.window.width - 8,
    height: Layout.window.width / 3,
    resizeMode: 'contain',
  },
  profitFiat: {
    borderRadius: 4,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 8,
  },
  profitFiatText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  profitPercent: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    padding: 4,
  },
  profitPercentText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.quiteTransparent,
  },
  profitBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    paddingLeft: Layout.isSmallDevice ? 18 : 34,
    paddingRight: Layout.isSmallDevice ? 18 : 34,
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: 100,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: theme.colors.buttonv2,
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
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default BalanceHeader;
