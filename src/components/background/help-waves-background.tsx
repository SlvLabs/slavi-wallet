import React, {ReactNode} from 'react';
import {helpBackground, loadingBackground} from '../../assets/images';
import {ImageBackground, StyleSheet} from 'react-native';
import theme from '../../theme';
import Layout from '../../utils/layout';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import SafeAreaView from 'react-native-safe-area-view';

export default function HelpWavesBackground({children}: {children: ReactNode}) {
  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <ImageBackground source={helpBackground} style={styles.background}>
          <RadialGradient style={styles.flex} {...theme.gradients.radialWavesGradient}>
            <RadialGradient style={styles.content} {...theme.gradients.radialWavesGradientHelp}>
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
});
