import React, {ReactNode} from 'react';
import {congratulationsBackground, loadingBackground} from '../../assets/images';
import {ImageBackground, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme';
import Layout from '../../utils/layout';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';

interface WavesBackgroundProps {
  children: ReactNode;
  contentStyle?: ViewStyle;
}

export default function WavesBackground({children, contentStyle}: WavesBackgroundProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <ImageBackground source={congratulationsBackground} style={styles.background}>
          <RadialGradient style={styles.flex} {...theme.gradients.radialWavesGradient}>
            <RadialGradient style={{...styles.content, ...contentStyle}} {...theme.gradients.radialWavesGradient2}>
              {children}
            </RadialGradient>
          </RadialGradient>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Layout.isSmallDevice ? 24 : 32,
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});
