import React, {ReactNode} from 'react';
import {congratulationsBackground, loadingBackground} from '../../assets/images';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import theme from '../../theme';
import Layout from '../../utils/layout';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';

export default function WavesBackground({children}: {children: ReactNode}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <ImageBackground source={congratulationsBackground} style={styles.background}>
          <RadialGradient style={styles.flex} {...theme.gradients.radialWavesGradient}>
            <RadialGradient style={styles.content} {...theme.gradients.radialWavesGradient2}>
              {children}
            </RadialGradient>
          </RadialGradient>
       </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
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
  // wavesLeft: {
  //   position: 'absolute',
  //   // left: -80,
  //   left: 0,
  //   top: Layout.isSmallDevice ? 172 : 237,
  //   width: Layout.isSmallDevice ? 92 : 108,
  //   height: Layout.isSmallDevice ? 367 : 429,
  //   // transform: [{rotate: '-19.28deg'}],
  //   // opacity: 0.4,
  // },
  // wavesRight: {
  //   position: 'absolute',
  //   top: Layout.isSmallDevice ? 130 : 187,
  //   right: 0,
  //   width: Layout.isSmallDevice ? 240 : 281,
  //   height: Layout.isSmallDevice ? 367 : 460,
  //   transform: [{rotate: '-31.96deg'}],
  //   opacity: 1
  // },
});
