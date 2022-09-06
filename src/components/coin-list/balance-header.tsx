import React, {useMemo} from 'react';
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

const MAX_BUTTON_LABEL = 7;

const BalanceHeader = (props: BalanceHeaderProps) => {
  const {fiatBalance, fiatTicker, onSendClick, onReceiveClick, onBuyClick} = props;
  const fiatRound = props.fiatRound || 2;
  const {t} = useTranslation();

  const iconsIsShown = useMemo(() =>
    !Layout.isSmallDevice  || (
      t('Send').length <= MAX_BUTTON_LABEL &&
      t('Receive').length <= MAX_BUTTON_LABEL &&
      t('Buy').length <= MAX_BUTTON_LABEL
    ), [t]);

  return (
    <View style={styles.container}>
      <ImageBackground source={balanceHeader} style={styles.image} resizeMode={'stretch'}>
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
            leftIcon={iconsIsShown && <Image source={upButton} style={styles.buttonImage} />}
            containerStyle={{...styles.button, paddingRight: iconsIsShown ? 11 : 0, marginRight: 8}}
            textStyle={styles.buttonText}
          />
          <SimpleButton
            title={t('Receive')}
            onPress={onReceiveClick}
            leftIcon={iconsIsShown && <Image source={downButton} style={styles.buttonImage} />}
            containerStyle={{...styles.button, paddingRight: iconsIsShown ? 11 : 0, marginRight: 8}}
            textStyle={styles.buttonText}
          />
          <SimpleButton
            title={t('Buy')}
            onPress={onBuyClick}
            leftIcon={iconsIsShown && <Image source={dollarButton} style={styles.buttonImage} />}
            containerStyle={{...styles.button, paddingRight: iconsIsShown ? 11 : 0}}
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
    // flex: 1,
    backgroundColor: theme.colors.balanceHeaderBackground,
  },
  image: {
    paddingTop: Layout.isSmallDevice ? 50 : 100,
    height: Layout.isSmallDevice ? 163 : 243,
    justifyContent: 'flex-start',
    flexShrink: 1,
    flexGrow: 0,
    // flexBasis: '100%',
  },
  linerGradient: {},
  leftGradient: {},
  rightGradient: {},
  balances: {
    marginTop: -10,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    paddingLeft: Layout.isSmallDevice ? 18 : 34,
    paddingRight: Layout.isSmallDevice ? 18 : 34,
    justifyContent: 'space-around',
    marginTop: Layout.isSmallDevice ? 30 : 40,
    marginBottom: 40,
  },
  button: {
    width: Layout.isSmallDevice ? 92 : 103,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 11,
    paddingLeft: 0,
    backgroundColor: theme.colors.buttonv3,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBalance: {},
  buttonText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: theme.fonts.gilroy,
    textAlign: 'center',
    letterSpacing: 0.01,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
});

export default BalanceHeader;
