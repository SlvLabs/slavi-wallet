import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import useNftList from '@slavi/wallet-core/src/providers/ws/hooks/nft/use-nft-list';
import Spinner from '../spinner';
import NftListElement from './nft-list-element';
import {nftPlaceholder3} from '../../assets/images';
import Layout from '../../utils/layout';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import NftFilterRow from './nft-filter-row';

export default function NftList() {
  const {list, isLoading, switchHidden, filter} = useNftList();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onElementPress = useCallback(
    (id: string, contract: string, network: string) => {
      navigation.navigate(ROUTES.COINS.NFT_INFO, {id, contract, network});
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  if (!list?.length) {
    return (
      <View style={styles.container}>
        <NftFilterRow
          showed={0}
          showHiddenTokens={filter.showHiddenTokens}
          setShowHiddenTokens={filter.setShowHiddenTokens}
          networks={filter.networks}
          update={filter.update}
          updateLoading={filter.isUpdateLoading}
        />
        <View style={styles.placeholderContainer}>
          <Image source={nftPlaceholder3} style={styles.placeholderImage} />
          <Text style={styles.placeholderTitle}>{t('noNftTitle')}</Text>
          <Text style={styles.placeholderDescription}>{t('noNftDescription')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <NftFilterRow
          showed={list.length}
          showHiddenTokens={filter.showHiddenTokens}
          setShowHiddenTokens={filter.setShowHiddenTokens}
          networks={filter.networks}
          update={filter.update}
          updateLoading={filter.isUpdateLoading}
        />
        {list?.map(entry => (
          <NftListElement
            name={entry.name}
            network={entry.network.name}
            onElementPress={onElementPress}
            switchHidden={switchHidden}
            hidden={entry.hidden}
            id={entry.id}
            contract={entry.contract}
            network_id={entry.network.id}
            image={entry.image}
            key={entry.token_id}
            networkLogo={entry.network.logo}
            token_id={entry.token_id}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
    minHeight: Layout.window.height - 280,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  placeholderImage: {
    width: 120,
    height: 120,
  },
  placeholderTitle: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    color: theme.colors.white,
    marginTop: 10,
  },
  placeholderDescription: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    color: theme.colors.white,
    marginTop: 10,
    opacity: 0.3,
    flexWrap: 'wrap',
    width: 175,
    textAlign: 'center',
  },
});
