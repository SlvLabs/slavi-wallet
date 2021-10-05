import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import SummaryBalanceElement from './summary-balance-element';
import theme from '../../theme';
import {chart} from '../../assets/images';
import ElementWithChevron, {ChevronType} from './element-with-chevron';

export interface BalanceHeaderProps {
  fiatBalance: string;
  fiatTicker: string;
  fiatRound?: number;
}

const BalanceHeader = (props: BalanceHeaderProps) => {
  const {fiatBalance} = props;
  const fiatRound = props.fiatRound || 2;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.balances}>
        <Text style={styles.label}>{t('Total Value')}</Text>
        <SummaryBalanceElement
          balance={fiatBalance}
          round={fiatRound}
          ticker={'$'} // TODO: receive from backend
        />
        <View style={styles.profitBlock}>
          <Text style={styles.subLabel}>{t('Profit 24h')}</Text>
          <View style={styles.profitRow}>
            <View style={styles.profitFiat}>
              <ElementWithChevron
                value={'+$5,000.55'}
                label={''}
                type={ChevronType.positive}
                valueStyle={styles.profitFiatText}
                labelStyle={styles.profitFiatText}
                changeStyle={styles.profitFiatText}
                chevronColor={theme.colors.white}
              />
            </View>
            <View style={styles.profitPercent}>
              <Text style={styles.profitPercentText}>-2.00%</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.chart}>
        <Image source={chart} style={styles.chartImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'row',
  },
  balances: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 0.4,
    lineHeight: 12,
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
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  chart: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chartImage: {
    width: 163,
    height: 80.5,
  },
  profitFiat: {
    backgroundColor: theme.colors.lightGreen,
    borderRadius: 4,
    padding: 4,
    marginRight: 4,
  },
  profitFiatText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
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
    color: theme.colors.lightGreen,
  },
  profitBlock: {
    marginTop: 18,
  }
});

export default BalanceHeader;
