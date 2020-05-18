import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ROUTES from '../../navigation/config/routes';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import DrawerHeader from './drawer-header';
import DrawerElement from './drawer-element';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState} from '@react-navigation/native';
import DrawerActiveElement from './drawer-active-element';
import store from '@slavi/wallet-core/src/store/index';
import useTotalBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-total-balance-hook';

export interface WalletDrawerProps {
  navigation: DrawerNavigationHelpers;
  state: DrawerNavigationState<any>;
}

interface DrawerElementData {
  text: string;
  icon: string;
  route: string;
  iconSize?: number;
}

const WalletDrawer = (props: WalletDrawerProps) => {
  const {t} = useTranslation();
  const {navigation, state} = props;

  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';
  const balance = useTotalBalance({
    fiat: fiat,
    crypto: crypto,
    fiatPrecision: 2,
    cryptoPrecision: 4,
  });

  const drawerTopElements: DrawerElementData[] = useMemo(
    () => [
      {
        text: t('Coins'),
        icon: 'coins',
        route: ROUTES.DRAWER.TABS,
        iconSize: 28,
      },
      {
        text: t('Billing'),
        icon: 'billing',
        route: ROUTES.DRAWER.BILLING,
      },
      {
        text: t('Debug'),
        icon: 'tag',
        route: ROUTES.DRAWER.DEBUG,
      },
    ],
    [t],
  );

  const drawerBottomElements: DrawerElementData[] = useMemo(
    () => [
      {
        text: t('Settings'),
        icon: 'settings',
        route: ROUTES.DRAWER.SETTINGS,
        iconSize: 24,
      },
      {
        text: t('Logout'),
        icon: 'logout',
        route: '',
      },
    ],
    [t],
  );

  const renderElements = useCallback(
    (elements: DrawerElementData[]) =>
      elements.map((element: DrawerElementData) => {
        if (state.routeNames[state.index] === element.route) {
          return (
            <DrawerActiveElement
              iconName={element.icon}
              text={element.text}
              onPress={() => navigation.navigate(element.route)}
              key={`drawer_${element.route}`}
              iconSize={element.iconSize}
            />
          );
        } else {
          return (
            <DrawerElement
              iconName={element.icon}
              text={element.text}
              onPress={() => navigation.navigate(element.route)}
              key={`drawer_${element.route}`}
              iconSize={element.iconSize}
            />
          );
        }
      }),
    [navigation, state.index, state.routeNames],
  );

  return (
    <View style={styles.wrap}>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <LinearGradient style={styles.container} {...theme.gradientsOld.drawer}>
          <DrawerHeader
            cryptoBalance={balance.crypto}
            fiatBalance={balance.fiat}
            fiatTicker={fiat}
            cryptoTicker={crypto}
          />
          <View style={styles.topItems}>
            {renderElements(drawerTopElements)}
          </View>
          <View style={styles.delimiter} />
          <View style={styles.bottomItems}>
            {renderElements(drawerBottomElements)}
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default WalletDrawer;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  safeAreaTop: {
    flex: 0,
    backgroundColor: theme.colorsOld.drawerTop,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: theme.colorsOld.drawerBottom,
  },
  container: {
    flex: 1,
    shadowColor: '#E4E4E4',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.64,
    shadowRadius: 24,
    elevation: 5,
  },
  topItems: {
    flex: 8,
  },
  delimiter: {
    margin: 16,
    borderTopColor: theme.colorsOld.darkGray,
    borderTopWidth: 1,
    opacity: 0.3,
  },
  bottomItems: {
    flex: 2,
  },
  bottomLink: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLinkText: {
    marginLeft: 10,
  },
});
