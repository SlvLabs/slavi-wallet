import React from 'react';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';

export function ShimmerGradient(props: LinearGradientProps) {
  return <LinearGradient useAngle={true} angle={150} {...props} />;
}
