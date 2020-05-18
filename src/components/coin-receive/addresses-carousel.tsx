import React, {useCallback, useEffect, useRef} from 'react';
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
  let carousel = useRef<Carousel<any> | null>();

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
      if (refs.current[index]) {
        refs.current[index].toDataURL(props.onDataChange);
      }

      if (props.onSnapToItem && typeof props.onSnapToItem === 'function') {
        props.onSnapToItem(
          props.addresses[index].address,
          props.addresses[index].id,
        );
      }
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
  }, [onSnapItem, props.addresses]);

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
      <CarouselSlideButton icon={leftChevron} onPress={snapToPrev} />
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
      <CarouselSlideButton icon={rightChevron} onPress={snapToNext} />
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
    flex: 1,
  },
});
export default AddressesCarousel;
