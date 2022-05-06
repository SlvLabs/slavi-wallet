import React, {useMemo} from 'react';
import {Animated, Easing, StyleSheet, View, ViewStyle} from 'react-native';
import {spinner} from '../assets/images';

export interface SpinnerProps {
  containerStyle?: ViewStyle;
  spinnerStyle?: ViewStyle;
}

const Spinner = (props: SpinnerProps) => {
  const spin = useMemo(() => {
    const val = new Animated.Value(0);
    Animated.loop(
      Animated.timing(val, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    return val.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }, []);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Animated.Image
        source={spinner}
        style={{
          ...styles.spinner,
          ...props.spinnerStyle,
          transform: [{rotate: spin}],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  spinner: {
    height: 100,
    width: 100,
  },
});

export default Spinner;
