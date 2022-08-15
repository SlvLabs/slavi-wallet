import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {useRoute} from '@react-navigation/core';
import {CoinSuccessfullySendingRouteProps} from '../../navigation/CoinsStack';
import Layout from '../../utils/layout';
import {check2} from '../../assets/images';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import SingleRecipientInfo from '../../components/coin-send/single-recipient-info';
import MoreRecipientInfo from '../../components/coin-send/more-recipient-info';
import ScrollableScreen from '../../components/scrollable-screen';
import makeRoundedBalance from '../../utils/make-rounded-balance';

const SuccessfullySendingScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {params: {recipients, coin}} = useRoute<CoinSuccessfullySendingRouteProps>();

  const details = useCoinDetails(coin);

  const homeOnPress = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.TABS.OPERATIONS,
          },
        ],
      }),
    [navigation],
  );

  if(!details) {
    throw new Error('Unknown coin');
  }

  return (
    <ScrollableScreen
      title={t('Send coins')}
      disableBackButton={true}
      contentStyle={recipients.length > 1 ? styles.multipleContainer : styles.singleContainer}
    >
      <View style={styles.content}>
        <Image source={check2} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>{t('Success')}</Text>
          <Text style={styles.description}>
            {recipients.length > 1
              ? t('successToAddresses')
              : t('successToAddress')}
          </Text>
        </View>
        <SingleRecipientInfo
          amount={makeRoundedBalance(4, recipients[0].amount)}
          address={recipients[0].address}
          logo={details?.logo}
          ticker={details?.ticker}
        />
        {recipients.length > 1 && <MoreRecipientInfo recipients={recipients} ticker={details.ticker} logo={details.logo} />}
      </View>
      <View style={styles.controls}>
        <SolidButton title={t('Home')} onPress={homeOnPress} />
      </View>
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  singleContainer: {
    justifyContent: 'flex-start',
  },
  multipleContainer: {
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  description: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 13 : 14,
    lineHeight: Layout.isSmallDevice ? 18 : 20,
    color: theme.colors.textLightGray,
  },
  controls: {
    marginTop: Layout.isSmallDevice ? 24 : 32,
    marginBottom: Layout.isSmallDevice ? 24 : 32,
  },
  descriptionContainer: {
    marginTop: Layout.isSmallDevice ? 20 : 32,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    marginTop: Layout.isSmallDevice ? 40 : 56,
  },
  descriptionHeader: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: Layout.isSmallDevice ? 18 :22,
    lineHeight: Layout.isSmallDevice ? 25 : 31,
    color: theme.colors.white,
  },
});

export default SuccessfullySendingScreen;
