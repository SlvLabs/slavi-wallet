import {BalanceViewProps} from '../coins/balance-view';
import React from 'react';
import {useTranslation} from 'react-i18next';
import ConvertedBalanceElement from './converted-balance-element';
import {StyleSheet, View, Text} from 'react-native';
import OutlineButton from '../buttons/outline-button';
import Card from '../view/card';
import RoiElement from './roi-element';
import theme from '../../theme';
import Button from '../buttons/button';

export interface StakingCardProps extends BalanceViewProps {
  investNotAvailable: boolean;
  withdrawNotAvailable: boolean;
  roi?: number;
  onPressInvest?: () => void;
  onPressWithdraw?: () => void;
  onPressCalculate?: () => void;
}

const StakingCard = (props: StakingCardProps) => {
  const {t} = useTranslation();
  return (
    <Card>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{t('Investment')}</Text>
        {!!props.roi && <RoiElement roi={props.roi} />}
      </View>
      <ConvertedBalanceElement
        balance={props.balance}
        ticker={props.ticker}
        fiatBalance={props.fiatBalance}
        fiatTicker={props.fiatTicker}
        cryptoBalance={props.cryptoBalance}
        cryptoTicker={props.cryptoTicker}
      />
      <View style={styles.buttonRow}>
        <OutlineButton
          title={t('Invest')}
          onPress={props.onPressInvest}
          buttonStyle={styles.button}
        />
        <OutlineButton
          title={t('Calculate')}
          onPress={props.onPressCalculate}
          buttonStyle={styles.button}
        />
        <Button
          title={t('Withdraw')}
          disabled={true}
          onPress={props.onPressWithdraw}
          buttonStyle={styles.button}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  button: {
    width: 88,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: theme.colorsOld.lightGray,
  },
});

export default StakingCard;
