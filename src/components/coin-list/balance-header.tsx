import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import SummaryBalanceElement from './summary-balance-element';
import theme from '../../theme';
import {chart} from '../../assets/images';
import CustomIcon from '../custom-icon/custom-icon';
import SimpleSolidButton from '../buttons/simple-solid-button';
import SimpleOutlineButton from '../buttons/simple-outline-button';

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
      <View style={styles.balances}>
        <SummaryBalanceElement
          balance={fiatBalance}
          round={fiatRound}
          ticker={fiatTicker}
        />
        <View style={styles.profitBlock}>
          <Text style={styles.subLabel}>{t('Profit 24h')}</Text>
          <View style={styles.profitRow}>
            <View style={styles.profitFiat}>
              <Text style={styles.profitFiatText}>{t('Coming soon')}</Text>
            </View>
            <View style={styles.profitPercent}>
              <Text style={styles.profitPercentText}>0.00%</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.chart}>
        <Image source={chart} style={styles.chartImage} />
      </View>
      <View style={styles.buttonsRow}>
        <SimpleOutlineButton
          title={t('Send')}
          onPress={onSendClick}
          leftIcon={<CustomIcon name={'dollar-circle'} color={theme.colors.white} size={24}/>}
          rightIcon={<CustomIcon name={'arrow-up'} color={theme.colors.white} size={24}/>}
          containerStyle={styles.button}
        />
        <SimpleSolidButton
          title={t('Receive')}
          onPress={onReceiveClick}
          leftIcon={<CustomIcon name={'slavi2'} color={theme.colors.white} size={24}/>}
          rightIcon={<CustomIcon name={'arrow-down-1'} color={theme.colors.white} size={24}/>}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flexDirection: 'column',
    backgroundColor: theme.colors.balanceHeaderBackground,
  },
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
  },
  chartImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  profitFiat: {
    backgroundColor: theme.colors.black,
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
    color: theme.colors.green,
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  profitPercent: {
    backgroundColor: theme.colors.blackoutTransparent,
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
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
  },
  button: {
    width: 140,
    justifyContent: 'space-between',
  }
});

export default BalanceHeader;
