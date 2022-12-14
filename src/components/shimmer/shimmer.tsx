import ShimmerPlaceholder, {ShimmerPlaceholderProps} from 'react-native-shimmer-placeholder';
import {ShimmerGradient} from './shimmer-gradient';
import theme from '../../theme';
import React from 'react';

export interface ShimmerProps extends ShimmerPlaceholderProps {}

export function Shimmer(props: ShimmerProps) {
  return (
    <ShimmerPlaceholder
      // @ts-ignore
      LinearGradient={ShimmerGradient}
      shimmerColors={[theme.colors.tabsColor, theme.colors.tatActiveTitle, theme.colors.tabsColor]}
      location={[0.2, 0.5, 0.8]}
      {...props}
    />
  );
}
