import React, {useCallback, useMemo, useRef, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import WrappedTabView, {
  RouteData,
  WrappedSceneRendererProps,
  WrappedTabViewHandle,
} from '../../components/tabs/wrapped-tab-view';
import {DepositTab} from '../../components/earn/btc/deposit-tab';
import {InvestmentsTab} from '../../components/earn/btc/investments-tab';
import {useRoute} from '@react-navigation/native';
import {EarnInvestmentRouteProps} from '../../navigation/earn-stack';
import Screen from '../../components/screen';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export function BtcEarnScreen() {
  const [forceReload, setForceReload] = useState<number>(0);

  const tabsRef = useRef<WrappedTabViewHandle>(null);

  const route = useRoute<EarnInvestmentRouteProps>();
  const coin = route.params?.coin;
  if (!coin) {
    throw new Error('Coin is required for earning display');
  }

  const coinDetails = useCoinDetails(coin);
  if (!coinDetails) {
    throw new Error('Coin is unknown');
  }

  const {t} = useTranslation();

  const routes = useMemo(
    () => [
      {key: 'deposit', title: t('stakingDeposit')},
      {key: 'investements', title: t('stakingInvestements')},
    ],
    [t],
  );

  const toInvestementsTab = useCallback(() => {
    if (tabsRef.current) {
      setForceReload(p => p + 1);
      tabsRef.current.switchTo(1);
    }
  }, []);

  const renderScene = useCallback(
    ({route: tabRoute}: WrappedSceneRendererProps<RouteData>) => {
      switch (tabRoute.key) {
        case 'deposit':
          return <DepositTab coinDetails={coinDetails} onSuccess={toInvestementsTab} />;
        case 'investements':
          return <InvestmentsTab coinDetails={coinDetails} forceReload={forceReload} />;
        default:
          return null;
      }
    },
    [coinDetails, forceReload, toInvestementsTab],
  );

  return (
    <Screen title={t('btcStaking', {ticker: coinDetails.ticker})}>
      <WrappedTabView routes={routes} renderScene={renderScene} ref={tabsRef} />
    </Screen>
  );
}
