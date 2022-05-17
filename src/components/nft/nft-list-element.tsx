import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import Layout from '../../utils/layout';
import theme from '../../theme';
import getImageSource from '../../utils/get-image-source';
import {coinPlaceholder} from '../../assets/images';
import NftImage from './nft-image';

export interface NftListElementProps {
  name: string;
  image?: string;
  network: string;
  networkLogo?: string;
  onPress: () => void;
}

export default function NftListElement(props: NftListElementProps) {
  const {name, image, network, onPress, networkLogo} = props;

  const {t} = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <NftImage image={image} imageStyle={styles.image} placeHolderContainerStyle={styles.placeholderContainer}/>
      <Text style={styles.name} ellipsizeMode='tail' numberOfLines={2}>{name}</Text>
      <View style={styles.networkRow}>
        <Image source={getImageSource(networkLogo, coinPlaceholder)} style={styles.networkLogo} />
        <Text style={styles.networkLabel}>{`${t('nftBlockchain')}:`}</Text>
        <Text style={styles.network}>{network}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Layout.isSmallDevice ? 288 : 340,
    height: Layout.isSmallDevice ? 340 : 405,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    marginBottom: 10,
    padding: 20,
    backgroundColor: theme.colors.grayDark,
  },
  image: {
    width: Layout.isSmallDevice ? 256 : 300,
    height: Layout.isSmallDevice ? 256 : 300,
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
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkLabel: {
    marginRight: 4,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 13,
    lineHeight: Layout.isSmallDevice ? 14: 15,
    color: theme.colors.textLightGray,
  },
  network: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 13,
    lineHeight: Layout.isSmallDevice ? 14: 15,
    color: theme.colors.white,
  },
  networkLogo: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  placeholderContainer: {
    backgroundColor: 'transparent',
    marginLeft: -15,
    borderWidth: 0,
    height: Layout.isSmallDevice ? 256 : 300,
  },
});
