import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ViewStyle} from 'react-native';
import {Icon, IconProps} from 'react-native-elements';
import theme from '../../theme';

export interface CarouselSlideButtonProps {
  icon: IconProps;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const CarouselSlideButton = (props: CarouselSlideButtonProps) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.containerStyle}}
      onPress={props.onPress}>
      <Icon color={theme.colors.white} {...props.icon} />
    </TouchableOpacity>
  );
};

export const leftChevron = {
  name: 'left',
  type: 'antdesign',
};

export const rightChevron = {
  name: 'right',
  type: 'antdesign',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
  },
});

export default CarouselSlideButton;
