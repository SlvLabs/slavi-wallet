import React, {useState} from 'react';
import {CoinListElement} from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import InfoView, {CoinParams} from './info-view';
import {StyleSheet, View} from 'react-native';
import HistoryView from './history-view';
import CoinTabsHeader from './coin-tabs-header';

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

enum ScreenKeys {
  info,
  history,
}

const names = {
  [ScreenKeys.info]: 'Info',
  [ScreenKeys.history]: 'History',
};

const renders = {
  [ScreenKeys.info]: renderInfo,
  [ScreenKeys.history]: renderHistory,
};

const CoinTabs = (props: CoinTabsProps) => {
  const [activeScreen, setActiveScreen] = useState<ScreenKeys>(ScreenKeys.info);
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default CoinTabs;
