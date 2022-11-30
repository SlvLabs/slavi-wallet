import React, {useMemo, useState} from 'react';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/coins/use-coin-info';
import InfoView, {CoinParams} from './info-view';
import {StyleSheet, View} from 'react-native';
import HistoryView from './history-view';
import CoinTabsHeader from './coin-tabs-header';
import useTranslation from '../../../utils/use-translation';
import RateView from './rate-view';

export interface CoinTabsProps {
  infoParams: CoinListElement[];
  fiat: string;
  crypto: string;
  infoIsLoading: boolean;
  coin: string;
  coinParams?: CoinParams;
}

const renderInfo = (props: CoinTabsProps) => {
  return (
    <InfoView
      params={props.infoParams}
      fiat={props.fiat}
      crypto={props.crypto}
      isLoading={props.infoIsLoading}
      coinParams={props.coinParams}
    />
  );
};

const renderHistory = (props: CoinTabsProps) => <HistoryView coin={props.coin} />;

const renderRates = (props: CoinTabsProps) => <RateView coin={props.coin} />;

enum ScreenKeys {
  info,
  history,
  rates,
}

const renders = {
  [ScreenKeys.info]: renderInfo,
  [ScreenKeys.history]: renderHistory,
  [ScreenKeys.rates]: renderRates,
};

const CoinTabs = (props: CoinTabsProps) => {
  const [activeScreen, setActiveScreen] = useState<ScreenKeys>(ScreenKeys.info);
  const {t} = useTranslation();

  const names = useMemo(() => {
    const _names: Record<number, string> = {
      [ScreenKeys.info]: t('Info'),
      [ScreenKeys.history]: t('History'),
    };

    if (!props.coinParams?.disablePriceHistory) {
      _names[ScreenKeys.rates] = t('rates');
    }

    return _names;
  }, [t, props.coinParams?.disablePriceHistory]);

  return (
    <View style={styles.container}>
      <CoinTabsHeader tabs={names} activeTab={activeScreen} onTabChange={setActiveScreen} />
      {renders[activeScreen](props)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default CoinTabs;
