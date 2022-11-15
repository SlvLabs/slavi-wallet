import {Image, ImageSourcePropType, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import Layout from '../../utils/layout';
import {
  banner_dapp_guide,
  banner_binance_connect,
  banner_floyd_fight,
  banner_peercoin_listing,
  banner_slavi_academy,
  banner_staking_1000,
} from '../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import SimpleToast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';

interface Banner {
  image: ImageSourcePropType;
  onPress?: () => void;
}

export default function BannerCarousel() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const openURL = useCallback(
    async (url: string) => {
      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
      } else {
        SimpleToast.show(t('Can not open link'));
      }
    },
    [t],
  );
  const banners: Banner[] = useMemo(
    () => [
      {
        image: banner_peercoin_listing,
        onPress: () => {
          navigation.navigate(ROUTES.COINS.INFO, {coin: 'PEERCOIN'});
        },
      },
      {
        image: banner_floyd_fight,
        onPress: () => openURL('https://twitter.com/slavi_io/status/1591713742894813185'),
      },
      {
        image: banner_staking_1000,
      },
      {
        image: banner_dapp_guide,
        onPress: () => openURL('https://medium.com/@SlaviDapp/slavi-dapp-complete-guide-7d2cf9eb8a12'),
      },
      {
        image: banner_slavi_academy,
        onPress: () => openURL('https://academy.slavi.io/'),
      },
      {
        image: banner_binance_connect,
        onPress: () => openURL('https://twitter.com/slavi_io/status/1542167673227853831'),
      },
    ],
    [openURL, navigation],
  );
  const renderItem = useCallback(({item}: {item: Banner}) => {
    return (
      <TouchableOpacity onPress={item.onPress} activeOpacity={0.5} disabled={!item.onPress}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
    );
  }, []);
  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        loop={true}
        // enableSnap={true}
        autoPlay={true}
        autoPlayInterval={3000}
        style={styles.carousel}
        // snapEnabled={true}
        width={Layout.isSmallDevice ? 172 : 192}
        height={Layout.isSmallDevice ? 90 : 102}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
});

/*

    <Carousel
      data={data}
      renderItem={renderItem}
      loop={true}
      autoplay={true}
      autoplayInterval={3000}
      style={styles.carousel}
      horizontal={true}
      vertical={false}
      inactiveSlideOpacity={1}
      // activeSlideAlignment={'center'}
      // firstItem={0}
      useScrollView={false}
      enableSnap={true}
      loopClonesPerSide={data.length}
      removeClippedSubviews={false}
      sliderWidth={Layout.window.width}
      // itemWidth={Layout.window.width}
      itemWidth={Layout.isSmallDevice ? 172 : 192}
      height={Layout.isSmallDevice ? 90 : 102}
    />
*/
