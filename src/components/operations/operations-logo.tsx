import {Image, ImageSourcePropType, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

export interface OperationsLogoProps {
  logo: ImageSourcePropType;
  extraLogo?: ImageSourcePropType;
  containerStyle?: ViewStyle;
}

export function OperationsLogo({logo, extraLogo, containerStyle}: OperationsLogoProps) {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Image
        source={logo}
        style={styles.logo}
      />
      {!!extraLogo && (
        <Image
          source={extraLogo}
          style={styles.extraLogo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  extraLogo: {
    width: 16,
    height: 16,
    marginLeft: 24,
    marginTop: -12,
  },
});
