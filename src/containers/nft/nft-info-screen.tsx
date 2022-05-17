import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {NftSendRouteProps} from '../../navigation/CoinsStack';
import Spinner from '../../components/spinner';
import useNftInfo from '@slavi/wallet-core/src/providers/ws/hooks/nft/use-nft-info';
import getImageSource from '../../utils/get-image-source';
import {coinPlaceholder} from '../../assets/images';
import Layout from '../../utils/layout';
import theme from '../../theme';
import NftInfoElement from './nft-info-element';
import useTranslation from '../../utils/use-translation';
import shrinkAddress from '../../utils/shrink-address';
import SolidButton from '../../components/buttons/solid-button';
import Collapse from '../../components/controls/collapse';
import NftProperty from '../../components/nft/nft-property';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import ScreenHeader from '../../components/screen-header';
import NftImage from '../../components/nft/nft-image';

export default function NftInfoScreen() {
  const route = useRoute<NftSendRouteProps>();
  const {id, contract, network} = route.params;

  const {t} = useTranslation();
  const navigation = useNavigation();

  const {isLoading, data} = useNftInfo(network, contract, id);

  const onSendPress = useCallback(() =>
    navigation.navigate(ROUTES.COINS.NFT_SEND, {id, contract, network}),
    [navigation]
  );

  if(isLoading || !data) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScreenHeader title={t('nftExplorer')} />
      <NftImage image={data.image} imageStyle={styles.image}/>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.mainInfoContainer}>
          <NftInfoElement
            label={t('nftBlockchain')}
            value={data.network.name}
            image={getImageSource(data.network.logo, coinPlaceholder)}
          />
          <NftInfoElement label={t('nftParamStandard')} value={data.type} />
          <NftInfoElement
            label={t('nftParamAddress')}
            value={shrinkAddress(data.contract)}
            isLast={data.type !== 'ERC-1155'}
          />
          {data.type === 'ERC-1155' && (
            <NftInfoElement
              label={t('nftParamAmount')}
              value={`${data.amount || '0'} ${data.ticker || ''}`}
              isLast={true}
              valueStyle={styles.amount}
            />
          )}
        </View>
        {!!data.description && (
          <View style={styles.descriptionContainer}>
            <Collapse title={t('nftDescription')} collapsed={false}>
              <Text style={styles.description}>{data.description}</Text>
            </Collapse>
          </View>
        )}
        {!!data.properties && (
          <View style={styles.propertiesContainer}>
            <Collapse title={t('nftProperties')} collapsed={true}>
              <View style={styles.properties}>
                {data.properties.map((property, index) => (
                  <NftProperty title={property[0]} mainText={property[1]} key={`prop_${index}`}/>
                ))}
              </View>
            </Collapse>
          </View>
        )}
      </View>
      <SolidButton title={t('Send')} containerStyle={styles.button} onPress={onSendPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
    width: '100%',
  },
  image: {
    width: Layout.isSmallDevice ? 240 : 327,
    height: Layout.isSmallDevice ? 240 : 327,
    borderRadius: 12,
  },
  name: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21: 28,
    color: theme.colors.white,
    marginTop: 12,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  mainInfoContainer: {
    backgroundColor: theme.colors.cardBackground2,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  descriptionContainer: {},
  propertiesContainer: {},
  description: {
    textAlign: 'left',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: theme.colors.lightGray,
  },
  properties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 24,
    width: '100%',
  },
  amount: {
    color: theme.colors.green,
  }
});
