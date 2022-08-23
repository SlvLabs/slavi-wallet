import {Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React, {useCallback} from 'react';
import Layout from '../../utils/layout';
import {banner1, banner2, banner3, banner4, banner5} from '../../assets/images';

const data = [0, 1, 2, 3, 4];

const images = [banner1, banner2, banner3, banner4, banner5];

export default function BannerCarousel() {
  const renderItem = useCallback(({index}: {index: number}) => {
    return <Image source={images[index]} style={styles.image} />;
  }, []);
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
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
