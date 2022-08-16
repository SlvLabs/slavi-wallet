import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ViewStyle} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface CarouselSlideButtonProps {
  direction: 'next'|'prev';
  onPress?: () => void;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

const CarouselSlideButton = ({direction, onPress, containerStyle, disabled}: CarouselSlideButtonProps) => {
  const _onPress = useCallback(() => {
    if(!disabled && onPress) {
      onPress();
    }
  }, [onPress, disabled]);

  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle}}
      onPress={_onPress}>
      <CustomIcon
        color={theme.colors.textLightGray3}
        name={'carousel-arrow'}
        size={40}
        style={{
          ...(direction === 'prev' ? styles.prevIcon : styles.nextIcon),
          ...(disabled ? styles.disabledIcon : {})
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  prevIcon: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  nextIcon: {},
  disabledIcon: {
    opacity: 0.4,
  }
});

export default CarouselSlideButton;
