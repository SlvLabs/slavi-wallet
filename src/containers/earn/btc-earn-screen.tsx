import React, {useCallback, useMemo} from 'react';
import ScrollableScreen from '../../components/scrollable-screen';
import useTranslation from '../../utils/use-translation';
import {RouteData, WrappedSceneRendererProps, WrappedTabView} from '../../components/tabs/wrapped-tab-view';
import {DepositTab} from '../../components/earn/btc/deposit-tab';
import {InvestmentsTab} from '../../components/earn/btc/investments-tab';

export function BtcEarnScreen() {
  const {t} = useTranslation();

  const routes = useMemo(() => ([
    {key: 'deposit', title: t('stakingDeposit')},
    {key: 'investements', title: t('stakingInvestements')},
  ]), [t]);

  const renderScene = useCallback(({ route }: WrappedSceneRendererProps<RouteData>) => {
    switch (route.key) {
      case 'deposit':
        return <DepositTab />;
      case 'investements':
        return <InvestmentsTab />;
      default:
        return null;
    }
  }, []);

  return (
    <ScrollableScreen title={t('btcStaking')}>
      <WrappedTabView routes={routes} renderScene={renderScene} />
    </ScrollableScreen>
  );
}
