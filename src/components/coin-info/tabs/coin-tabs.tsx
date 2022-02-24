import React, {useMemo, useState} from 'react';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import InfoView, {CoinParams} from './info-view';
import {StyleSheet, View} from 'react-native';
import HistoryView from './history-view';
import CoinTabsHeader from './coin-tabs-header';
import useTranslation from '../../../utils/use-translation';
import RateView from './rate-view';
import Layout from '../../../utils/layout';

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

const renderHistory = (props: CoinTabsProps) => (
  <HistoryView coin={props.coin} />
);

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
    const names: Record<number, string> = {
      [ScreenKeys.info]: t('Info'),
      [ScreenKeys.history]: t('History'),
    };

    if(!props.coinParams?.disablePriceHistory) {
      names[ScreenKeys.rates] = t('rates');
    }

    return names;
  }, [t, props.coinParams?.disablePriceHistory]);

  return (
    <View style={styles.container}>
      <CoinTabsHeader
        tabs={names}
        activeTab={activeScreen}
        onTabChange={setActiveScreen}
      />
      {renders[activeScreen](props)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingRight: Layout.isSmallDevice ? 8 : 16,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default CoinTabs;
