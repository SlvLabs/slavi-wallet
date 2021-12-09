import React, {useCallback, useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import QrView from './qr-view';
import CarouselSlideButton, {
  leftChevron,
  rightChevron,
} from './carousel-slide-button';

export interface AddressData {
  address: string;
  name: string;
  id: number;
}

export interface AddressesCarouselProps {
  addresses: AddressData[];
  coin: string;
  amount: string;
  qrSize: number;
  onEdit: (name?: string) => void;
  qrStyle?: ViewStyle;
  addressTextStyle?: TextStyle;
  onDataChange?: (data: string | null) => void;
  onSnapToItem?: (address?: string, id?: number) => void;
  containerStyle?: ViewStyle;
}

const AddressesCarousel = (props: AddressesCarouselProps) => {
  const refs = useRef<any>();
  let carousel = useRef<Carousel<any> | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const _renderItem = useCallback(
    ({item, index}) => {
      return (
        <View style={{...styles.container, ...props.containerStyle}}>
          <QrView
            data={{
              address: item.address,
              coin: props.coin.toLowerCase(),
              amount: props.amount,
              name: item.name,
            }}
            size={props.qrSize}
            onDataChange={props.onDataChange}
            getRef={ref => {
              if (!refs.current) {
                refs.current = [];
              }
              refs.current[index] = ref;
            }}
            onEdit={props.onEdit}
          />
        </View>
      );
    },
    [
      props.amount,
      props.containerStyle,
      props.coin,
      props.onDataChange,
      props.onEdit,
      props.qrSize,
    ],
  );

  const onSnapItem = useCallback(
    (index: number) => {
      console.log(index);
      if (refs.current[index]) {
        refs.current[index].toDataURL(props.onDataChange);
      }

      props.onSnapToItem?.(props.addresses[index].address, props.addresses[index].id);
    },
    [props],
  );

  useEffect(() => {
    if (
      props.addresses &&
      props.addresses.length > 0 &&
      refs.current &&
      refs.current[0]
    ) {
      onSnapItem(0);
    }
  }, []);

  useEffect(() => setCurrentIndex(carousel.current?.currentIndex || 0), [carousel.current?.currentIndex]);

  const snapToNext = useCallback(() => {
    if (carousel.current) {
      carousel.current.snapToNext();
    }
  }, [carousel]);

  const snapToPrev = useCallback(() => {
    if (carousel.current) {
      carousel.current.snapToPrev();
    }
  }, [carousel]);

  return (
    <View style={styles.carouselContainer}>
      {currentIndex > 0 && <CarouselSlideButton icon={leftChevron} onPress={snapToPrev} />}
      <View style={styles.carouselMargin}>
        <Carousel
          renderItem={_renderItem}
          data={props.addresses}
          sliderWidth={264}
          sliderHeight={700}
          itemWidth={200}
          loop={false}
          enableSnap={true}
          shouldOptimizeUpdates={true}
          firstItem={0}
          onSnapToItem={onSnapItem}
          layout={'default'}
          inactiveSlideOpacity={-1}
          ref={c => {
            carousel.current = c;
          }}
          enableMomentum={true}
        />
      </View>
      {currentIndex < (props.addresses.length - 1) && <CarouselSlideButton icon={rightChevron} onPress={snapToNext} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    marginTop: 24,
    flex: 1,
  },
  carouselMargin: {
    marginRight: 16,
    marginLeft: 16,
  }
});
export default AddressesCarousel;
