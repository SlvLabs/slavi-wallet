import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Carousel from 'react-native-snap-carousel';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import QrView from './qr-view';
import CarouselSlideButton from './carousel-slide-button';

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
  onSnapToItem?: (address?: string, id?: number, addressName?: string) => void;
  containerStyle?: ViewStyle;
}

export interface AddressesCarouselHandle {
  snapById: (id: number) => void;
}

const AddressesCarousel: ForwardRefRenderFunction<AddressesCarouselHandle, AddressesCarouselProps> = (
  props: AddressesCarouselProps,
  ref,
) => {
  const {addresses} = props;
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
            getRef={_ref => {
              if (!refs.current) {
                refs.current = [];
              }
              refs.current[index] = _ref;
            }}
            onEdit={props.onEdit}
          />
        </View>
      );
    },
    [props.amount, props.containerStyle, props.coin, props.onEdit, props.qrSize],
  );

  const onSnapItem = useCallback(
    (index: number) => {
      if (refs.current[index]) {
        refs.current[index].toDataURL(props.onDataChange);
      }

      props.onSnapToItem?.(props.addresses[index].address, props.addresses[index].id, props.addresses[index].name);
    },
    [props],
  );

  useEffect(() => setCurrentIndex(carousel.current?.currentIndex || 0), [carousel.current?.currentIndex]);

  useImperativeHandle(ref, () => ({
    snapById(id: number) {
      const index = addresses.findIndex(element => element.id === id);
      if (index !== -1) {
        onSnapItem(index);
      }
    },
  }));

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
      <View style={styles.leftButton}>
        <CarouselSlideButton direction={'prev'} onPress={snapToPrev} disabled={currentIndex === 0} />
      </View>
      <View style={styles.carouselMargin}>
        <Carousel
          renderItem={_renderItem}
          data={props.addresses}
          sliderWidth={220}
          // sliderHeight={700}
          itemWidth={220}
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
          vertical={false}
          decelerationRate={'fast'}
          horizontal={true}
          useExperimentalSnap={true}
          disableIntervalMomentum={true}
          // enableMomentum={true}
          useScrollView={true}
        />
      </View>
      <View style={styles.rightButton}>
        <CarouselSlideButton
          direction={'next'}
          onPress={snapToNext}
          disabled={currentIndex === props.addresses.length - 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    marginTop: 24,
    flex: 1,
  },
  carouselMargin: {
    marginRight: 16,
    marginLeft: 16,
  },
  leftButton: {
    width: 36,
    justifyContent: 'center',
  },
  rightButton: {
    width: 36,
    justifyContent: 'center',
  },
});

export default forwardRef(AddressesCarousel);
