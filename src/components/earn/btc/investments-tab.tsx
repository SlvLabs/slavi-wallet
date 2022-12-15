import {FlatList, StyleSheet, View, Text, RefreshControl, ListRenderItemInfo, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useGetCurrentStakedForCoin} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-get-current-staked-for-coin';
import {useGetStakedList} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-get-staked-list';
import {InvestmentsElement} from './investments-element';
import {IWalletStakingUserStake} from '@slavi/wallet-core/src/providers/ws/messages/wallet-staking';
import {CoinDetails} from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import useTranslation from '../../../utils/use-translation';
import theme from '../../../theme';
import CryptoAmountText from '../../text/crypto-amount-text';
import Spinner from '../../spinner';
import getImageSource from '../../../utils/get-image-source';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import {EarnErrorPlaceholder} from './earn-error-placeholder';
import {Placeholder} from '../../placeholder';

export interface InvestmentsTabProps {
  coinDetails: CoinDetails;
  forceReload?: number;
}

const cryptoPrecision = 4;

export function InvestmentsTab({coinDetails, forceReload}: InvestmentsTabProps) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);

  const {t} = useTranslation();

  const {
    stakedInfo,
    isLoading: isStakedInfoLoading,
    error: errorStakedInfo,
  } = useGetCurrentStakedForCoin(coinDetails.id);

  const {reload, loadMore, resultData, isLoading, error} = useGetStakedList(coinDetails.id);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IWalletStakingUserStake>) =>
      coinDetails ? <InvestmentsElement ticker={coinDetails.ticker} paymentInfo={item} /> : <></>,
    [coinDetails],
  );

  const refresh = useCallback(() => {
    setReloading(true);
    reload();
  }, [reload]);

  useEffect(() => {
    if (forceReload) {
      reload();
    }
  }, [forceReload, reload]);

  useEffect(() => {
    if (!initialized && !isLoading) {
      setInitialized(true);
    }
    setReloading(isLoading);
  }, [initialized, isLoading]);

  if (isStakedInfoLoading || !initialized) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  }

  if (errorStakedInfo || error) {
    return <EarnErrorPlaceholder error={(errorStakedInfo || error) as string} />;
  }

  if (!stakedInfo) {
    return <EarnErrorPlaceholder error={t('internal error')} />;
  }

  return (
    <FlatList<IWalletStakingUserStake>
      data={resultData}
      renderItem={renderItem}
      keyExtractor={(item, index) => `payment_${index}`}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Placeholder text={t('stakingRewardsNotFound')} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.description}>{t('stakingDescription')}</Text>
          <View style={styles.stakedInfo}>
            <Image source={getImageSource(coinDetails.logo)} style={styles.logo} />
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>{t('stakingStaked')}</Text>
                <CryptoAmountText
                  ticker={coinDetails.ticker}
                  value={makeRoundedBalance(cryptoPrecision, stakedInfo.staked)}
                  style={styles.text}
                  tickerStyle={styles.text}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>{t('stakingNextPayout')}</Text>
                <CryptoAmountText
                  ticker={coinDetails.ticker}
                  value={makeRoundedBalance(cryptoPrecision, stakedInfo.rewards)}
                  style={styles.text}
                  tickerStyle={styles.text}
                />
              </View>
            </View>
          </View>
        </View>
      }
      refreshControl={<RefreshControl refreshing={reloading} onRefresh={refresh} />}
      onEndReached={loadMore}
    />
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 10,
    paddingBottom: 30,
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  stakedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: theme.colors.simpleCoinBackground,
    borderRadius: 8,
    marginTop: 16,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    color: theme.colors.gold2,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  column: {
    flex: 1,
  },
});
