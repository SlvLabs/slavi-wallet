import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../../components/custom-icon/custom-icon';
import Layout from '../../utils/layout';
import Screen from '../../components/screen';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {useGetEarnableCoins} from '@slavi/wallet-core/src/providers/ws/hooks/earning/use-get-earnable-coins';
import {CoinFromEarnableList} from '@slavi/wallet-core/src/providers/ws/messages/earning';
import {EarnableCoins} from '../../components/earn/earnable-coins';
import Toast from 'react-native-simple-toast';
import Spinner from '../../components/spinner';

const EarnScreen = () => {
  const [isListDisplayMode, setListDisplayMode] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const {isLoading, result: stakableCoins} = useGetEarnableCoins();

  const switchDisplayMode = () => setListDisplayMode(!isListDisplayMode);

  const onStakeCoinPress = useCallback(
    (coin: CoinFromEarnableList) => {
      if (coin.inDevelopment) {
        Toast.showWithGravity(t('inDevelopment'), Toast.LONG, Toast.CENTER);
      } else {
        navigation.navigate(ROUTES.EARN.INVESTMENT, {coin: coin.id, showAddresses: coin.showAddressesForStakingScreen});
      }
    },
    [navigation, t],
  );

  return (
    <Screen
      title={t('earn')}
      disableBackButton={true}
      controls={
        <TouchableOpacity style={styles.button} onPress={switchDisplayMode}>
          <CustomIcon name={isListDisplayMode ? 'Category' : 'lines'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      }
      headerContainerStyle={styles.headerContainer}
      titleContainerStyle={styles.headerTitleContainer}>
      {isLoading ? (
        <Spinner />
      ) : (
        <EarnableCoins coins={stakableCoins} onCoinPress={onStakeCoinPress} isListDisplayMode={isListDisplayMode} />
      )}
    </Screen>
  );
};

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
  },
});

export default EarnScreen;
