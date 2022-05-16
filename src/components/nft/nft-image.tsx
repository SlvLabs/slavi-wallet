import React from 'react';
import {Image, ImageStyle, StyleSheet, Text, View, ViewStyle} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import {nftPlaceholder1, nftPlaceholder2} from '../../assets/images';
import useTranslation from '../../utils/use-translation';
import Layout from '../../utils/layout';
import theme from '../../theme';

export interface NftImageProps {
  image?: string;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  placeHolderContainerStyle?: ViewStyle;
}

const IMAGE_UNSUPPORTED = 'unsupported';

export default function NftImage(props: NftImageProps) {
  const {image, containerStyle, imageStyle, placeHolderContainerStyle} = props;

  const {t} = useTranslation();

  if(!image) {
    return (
      <View style={{...styles.placeHolderContainer, ...placeHolderContainerStyle}}>
        <Image source={nftPlaceholder1} style={styles.placeHolderImage} />
        <Text style={styles.placeHolderText}>{t('nftNoMediaDisplay')}</Text>
      </View>
    );
  }

  if (image === IMAGE_UNSUPPORTED) {
    return (
      <View style={{...styles.placeHolderContainer, ...placeHolderContainerStyle}}>
        <Image source={nftPlaceholder2} style={styles.placeHolderImage} />
        <Text style={styles.placeHolderText}>{t('nftContentNotSupported')}</Text>
      </View>
    );
  }

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Image source={getImageSource(image, nftPlaceholder1)} style={{...styles.image, ...imageStyle}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: Layout.isSmallDevice ? 240 : 327,
    height: Layout.isSmallDevice ? 240 : 327,
    borderRadius: 12,
  },
  placeHolderContainer: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.isSmallDevice ? 240 : 327,
    width: Layout.isSmallDevice ? 240 : 327,
  },
  placeHolderText: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 13 : 16,
    lineHeight: Layout.isSmallDevice ? 17: 21,
    color: theme.colors.white,
    maxWidth: Layout.isSmallDevice ? 75 : 135,
    textAlign: 'center',
    opacity: 0.3,
    marginTop: Layout.isSmallDevice ? 10 : 15,
  },
  placeHolderImage: {
    width: Layout.isSmallDevice ? 96 : 120,
    height: Layout.isSmallDevice ? 96 : 120,
  },
});
