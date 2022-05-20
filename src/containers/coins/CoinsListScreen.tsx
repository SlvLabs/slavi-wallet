import {SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import BalanceHeader from '../../components/coin-list/balance-header';
import CoinListCard from '../../components/coin-list/coins-list-card';
import theme from '../../theme';
import ROUTES from '../../navigation/config/routes';
import store from '@slavi/wallet-core/src/store/index';
import {useFiatSymbolSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import useTotalBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-total-balance-hook';
import {useNavigation} from '@react-navigation/native';
import {TabView} from 'react-native-tab-view';
import NftList from '../../components/nft/nft-list';
import useTranslation from '../../utils/use-translation';
import LinearGradient from 'react-native-linear-gradient';
import {SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';

type Route = {
  key: string;
  title: string;
};

const CoinsListScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const fiat = store.useFiatSelector() || 'USD';
  const crypto = store.useCryptoSelector() || 'BTC';
  const fiatSymbol = useFiatSymbolSelector() || '$';
  const balance = useTotalBalance({fiat: fiat, crypto: crypto});

  const navigateToReceive = useCallback(() =>
      navigation.navigate(ROUTES.COINS.COINS_SELECT, {nextScreen: ROUTES.COINS.RECEIVE}),
    [navigation]);

  const navigateToSend = useCallback(() =>
      navigation.navigate(ROUTES.COINS.COINS_SELECT, {nextScreen: ROUTES.COINS.SEND, filterByBalance: true, balanceShown: true}),
    [navigation]);

  const routes = useMemo(() => ([
    {key: 'coins', title: t('assets')},
    {key: 'nft', title: t('nfts')},
  ]), [t]);

  const renderScene = useCallback(({ route }: SceneRendererProps & {route: Route}) => {
    switch (route.key) {
      case 'coins':
        return (
          <View style={tabIndex !== 0 && styles.hidden}>
            <CoinListCard containerStyle={styles.coinsCard} />
          </View>
        );
      case 'nft':
        return (
          <View style={tabIndex !== 1 && styles.hidden}>
            <NftList />
          </View>
        );
    }
  }, [tabIndex]);

  const renderTabs = useCallback((props: any) => {
    const {navigationState} = props;
    return (
      <View style={styles.tabBar}>
        {navigationState.routes.map((route: Route, i: number) => (
          <TouchableOpacity key={`tab_${i}`} onPress={() => setTabIndex(i)} style={styles.tabOptionContainer}>
            {tabIndex === i ? (
              <LinearGradient {...theme.gradients.activeTab} style={{...styles.tabOption, ...styles.activeTabOption}}>
                <Text style={styles.tabLabel}>{route.title}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.tabOption}>
                <Text style={styles.tabLabel}>{route.title}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))
        }
      </View>
    );
  }, [tabIndex]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'light-content'}
      />
      <ScrollView>
        <BalanceHeader
          fiatBalance={balance.fiat}
          fiatTicker={fiatSymbol}
          onReceiveClick={navigateToReceive}
          onSendClick={navigateToSend}
        />
        <View style={styles.content}>
          <TabView
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabs}
            onIndexChange={setTabIndex}
            lazy={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1,
  },
  coinsCard: {
    marginLeft: 0,
    marginRight: 0,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  tabBar: {
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: theme.colors.tabsColor,
    borderRadius: 8,
  },
  tabOption: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tabLabel: {
    color: theme.colors.white,
  },
  tabOptionContainer: {
    width: '50%',
  },
  activeTabOption: {
    borderRadius: 8,
  },
  hidden: {
    display: 'none',
  }
});

export default CoinsListScreen;
