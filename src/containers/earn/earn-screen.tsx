import React, {useCallback, useMemo, useState} from 'react';
import {TouchableOpacity,} from 'react-native';
import {StyleSheet} from 'react-native';
import {busd, dai, pax, usdc, usdt} from '../../assets/images';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../../components/custom-icon/custom-icon';
import Layout from '../../utils/layout';
import Screen from '../../components/screen';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {useGetEarnableCoins} from '@slavi/wallet-core/src/providers/ws/hooks/earning/use-get-earnable-coins';
import {RouteData, WrappedSceneRendererProps, WrappedTabView} from '../../components/tabs/wrapped-tab-view';
import {CoinFromEarnableList} from '@slavi/wallet-core/src/providers/ws/messages/earning';
import {EarnableCoins} from '../../components/earn/earnable-coins';
import Toast from 'react-native-simple-toast';
import Spinner from '../../components/spinner';

const stableCoins: CoinFromEarnableList[] = [
    {id: 'stub_busd', ticker: 'BUSD', logo: busd, types: [], inDevelopment: true},
    {id: 'stub_usds', ticker: 'USDC', logo: usdc, types: [], inDevelopment: true},
    {id: 'stub_dai',ticker: 'DAI', logo: dai, types: [], inDevelopment: true},
    {id: 'stub_usdt', ticker: 'USDT', logo: usdt, types: [], inDevelopment: true},
    {id: 'stub_usdp', ticker: 'USDP', logo: pax, types: [], inDevelopment: true},
];

const EarnScreen = () => {
  const [isListDisplayMode, setListDisplayMode] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const {error, isLoading, result: stakableCoins} = useGetEarnableCoins();

  const routes = useMemo(() => ([
    {key: 'staking', title: t('staking')},
    {key: 'stables', title: t('stables')},
  ]), [t]);

  const switchDisplayMode = () => setListDisplayMode(!isListDisplayMode);

  const onStakeCoinPress = useCallback(
    (coin: CoinFromEarnableList) => {
      if(coin.inDevelopment) {
        Toast.showWithGravity(t('inDevelopment'), Toast.LONG, Toast.CENTER)
      } else {
        navigation.navigate(ROUTES.EARN.INVESTMENT, {coin: coin.id});
      }
    },
    [t]
  );

  const onStableCoinPress = useCallback(
    () => Toast.showWithGravity(t('inDevelopment'), Toast.LONG, Toast.CENTER),
    [t]
  );

  const renderScene = useCallback(({ route }: WrappedSceneRendererProps<RouteData>) => {
    switch (route.key) {
      case 'staking':
        return <EarnableCoins
          coins={stakableCoins}
          onCoinPress={onStakeCoinPress}
          isListDisplayMode={isListDisplayMode}
        />;
      case 'stables':
        return <EarnableCoins
          coins={stableCoins}
          onCoinPress={onStableCoinPress}
          isListDisplayMode={isListDisplayMode}
        />;
      default:
        return null;
    }
  }, [stakableCoins, onStakeCoinPress, isListDisplayMode, onStableCoinPress, isListDisplayMode]);

  return (
    <Screen
      title={`${t('earn')} (${t('inProgress')})`}
      controls={(
        <TouchableOpacity style={styles.button} onPress={switchDisplayMode}>
          <CustomIcon name={isListDisplayMode ? 'Category' : 'lines'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      )}
      headerContainerStyle={styles.headerContainer}
      titleContainerStyle={styles.headerTitleContainer}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <WrappedTabView renderScene={renderScene} routes={routes}/>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingLeft: 0,
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    marginRight: Layout.isSmallDevice ? -32 : -40,
  }
});

export default EarnScreen;
