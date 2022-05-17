import React, {useCallback} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {NftSuccessRouteProps} from '../../navigation/CoinsStack';
import useTranslation from '../../utils/use-translation';
import {nftArrow, nftCheck, nftLogo} from '../../assets/images';
import Layout from '../../utils/layout';
import theme from '../../theme';
import shrinkAddress from '../../utils/shrink-address';
import SolidButton from '../../components/buttons/solid-button';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import NftImage from '../../components/nft/nft-image';

export default function NtfSuccessSendingScreen() {
  const route = useRoute<NftSuccessRouteProps>();
  const {image, name, amount, to, from, ticker} = route.params;

  const {t} = useTranslation();
  const navigation = useNavigation();

  const onHome = useCallback(() =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: ROUTES.TABS.OPERATIONS,
        },
      ],
    }), [navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Text style={styles.title}>{t('nftSuccessTitle')}</Text>
      <NftImage image={image} imageStyle={styles.image}/>
      <Image source={nftCheck} style={styles.check} />
      <Text style={styles.success}>{t('nftSuccess')}</Text>
      <Text style={styles.name}>{name}</Text>
      {!!amount && (
        <View style={styles.amountRow}>
          <View style={styles.amountLeftColumn}>
            <Image source={nftLogo} style={styles.nftLogo} />
            <Text style={styles.amountLabel}>{t('nftAmount')}</Text>
          </View>
          <View style={styles.amountRightColumn}>
            <Text style={styles.amount}>{`${amount} ${ticker || ''}`}</Text>
          </View>
        </View>
      )}
      <View style={styles.addressesBlock}>
        <Text style={styles.address}>{shrinkAddress(from)}</Text>
        <View style={styles.delimiterView}>
          <View style={styles.delimiter}/>
          <Image source={nftArrow} style={styles.nftArrow} />
          <View style={styles.delimiter}/>
        </View>
        <Text style={styles.address}>{shrinkAddress(to)}</Text>
      </View>
      <SolidButton title={t('nftHome')} containerStyle={styles.button} onPress={onHome}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 50,
    width: '100%',
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 12 : 18,
    lineHeight: Layout.isSmallDevice ? 18 : 28,
    color: theme.colors.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: Layout.isSmallDevice ? 130 : 190,
    height: Layout.isSmallDevice ? 130 : 190,
    borderRadius: 12,
  },
  success: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: Layout.isSmallDevice ? 18 : 22,
    lineHeight: Layout.isSmallDevice ? 28: 31,
    color: theme.colors.white,
    marginTop: 22,
    textAlign: 'center',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 10 : 14,
    lineHeight: Layout.isSmallDevice ? 16: 20,
    color: theme.colors.textLightGray,
    marginBottom: 24,
    textAlign: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 17,
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 16,
    width: '100%',
  },
  nftLogo: {
    width: 24,
    height: 24,
    marginRight: 18,
  },
  amountLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.textLightGray,
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  amountLeftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountRightColumn: {
    flexDirection: 'row',
  },
  addressesBlock: {
    padding: 24,
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 16,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 24,
  },
  nftArrow: {
    width: 24,
    height: 24,
  },
  delimiterView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  delimiter: {
    width: Layout.window.width/2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  check: {
    width: 32,
    height: 32,
    marginTop: -16,
  },
});
