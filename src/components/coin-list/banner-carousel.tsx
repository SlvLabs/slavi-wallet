import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import Layout from '../../utils/layout';
import Carousel from 'react-native-reanimated-carousel';
import SimpleToast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';
import {useNavigation} from '@react-navigation/native';
import {Shimmer} from '../shimmer/shimmer';
import {Banner, BannerType, useBanners} from '@slavi/wallet-core/src/providers/ws/hooks/use-banners';
import getImageSource from '../../utils/get-image-source';

export default function BannerCarousel() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {loading, banners, onImageLoad} = useBanners(3);

  const openURL = useCallback(
    async (url?: string) => {
      if (url && (await Linking.canOpenURL(url))) {
        await Linking.openURL(url);
      } else {
        SimpleToast.show(t('Can not open link'));
      }
    },
    [t],
  );

  const openInternal = useCallback(
    (route?: string, params?: Record<string, string>) => {
      if (route) {
        navigation.navigate(route, params);
      } else {
        SimpleToast.show(t('Can not open link'));
      }
    },
    [navigation, t],
  );

  const onBannerPress = useCallback(
    (banner: Banner) => {
      switch (banner.type) {
        case BannerType.external:
          openURL(banner.data!.externalUrl);
          return;
        case BannerType.internal:
          openInternal(banner.data.routeName, banner.data?.routeParams);
          return;
      }
    },
    [openInternal, openURL],
  );

  const renderItem = useCallback(
    ({item, index}: {item: Banner; index: number}) => {
      return (
        <Shimmer style={styles.shimmer} visible={!loading}>
          <TouchableOpacity
            onPress={() => onBannerPress(item)}
            activeOpacity={0.5}
            disabled={item.type === BannerType.noAction}>
            <Image source={getImageSource(item.imageUrl)} style={styles.image} onLoadEnd={() => onImageLoad(index)} />
          </TouchableOpacity>
        </Shimmer>
      );
    },
    [loading, onBannerPress, onImageLoad],
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        loop={true}
        autoPlay={!loading}
        autoPlayInterval={3000}
        style={styles.carousel}
        width={Layout.isSmallDevice ? 172 : 192}
        height={Layout.isSmallDevice ? 90 : 102}
        autoFillData={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: Layout.isSmallDevice ? -12 : -8,
    marginBottom: Layout.isSmallDevice ? 26 : 30,
  },
  gradient: {
    flex: 1,
  },
  carousel: {
    width: Layout.window.width,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: Layout.isSmallDevice ? 160 : 180,
    height: Layout.isSmallDevice ? 90 : 102,
  },
  shimmer: {
    width: Layout.isSmallDevice ? 160 : 180,
    height: Layout.isSmallDevice ? 90 : 102,
    borderRadius: 8,
  },
});
