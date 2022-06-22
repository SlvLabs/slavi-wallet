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

export default function NftList() {
  const {list, isLoading} = useNftList();

  const {t} = useTranslation();
  const navigation = useNavigation();

  const onElementPress = useCallback((id: string, contract: string, network: string) => {
    navigation.navigate(ROUTES.COINS.NFT_INFO, {id, contract, network})
  }, [navigation]);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  if(!isLoading && !list?.length) {
    return (
      <View style={styles.placeholderContainer}>
        <Image source={nftPlaceholder3} style={styles.placeholderImage}/>
        <Text style={styles.placeholderTitle}>{t('noNftTitle')}</Text>
        <Text style={styles.placeholderDescription}>{t('noNftDescription')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {list?.map((entry, index) => (
        <NftListElement
          name={entry.name}
          network={entry.network.name}
          onPress={() => onElementPress(entry.id, entry.contract, entry.network.id)}
          image={entry.image}
          key={`nft_${index}`}
          networkLogo={entry.network.logo}
        />
      ))}
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
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.window.height - 280,
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
    width: 150,
    textAlign: 'center',
  },
});
