import React, {useRef} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../store';
import {loadingBackground} from '../assets/images';
import theme from '../theme';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import { Animated } from 'react-native';
import Lottie from 'lottie-react-native';
import {loadingAnimation} from '../assets/annimation';
import Layout from '../utils/layout';

const POINT_COUNT = 4;

const LoadingScreen = () => {
  const connectionError = useSelector((state: State) => state.connection.error);

  const animations = useRef(Array.from(Array(POINT_COUNT), () => new Animated.Value(0))).current;

  for(let i = 0; i < POINT_COUNT; i++) {
    Animated.loop(Animated.sequence([
      Animated.timing(animations[i], {
      useNativeDriver: false,
      toValue: 1,
      duration: 500,
      delay: i*500,
    }),
    Animated.timing(animations[i], {
      useNativeDriver: false,
      toValue: 0,
      duration: 2000,
      delay: (i+1)*500,
    })
    ])).start();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradientAlt}>
          <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradientBottom}>
            <View style={styles.logoView}>
              <Lottie source={loadingAnimation} autoPlay={true} loop={false} style={styles.logo}/>
            </View>
            <View style={styles.bottomText}>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>Welcome to</Text>
              </View>
              <Text style={styles.nameText}>Slavi Multi-Chain</Text>
              <Text style={styles.nameText}>DApp</Text>
              {connectionError && (
                <Text>Problem connecting to the server try again later</Text>
              )}
            </View>

            <Animated.View style={styles.indicator}>
              {animations.map((animation, index) =>
                <Animated.View
                  style={[styles.loadingPoint, {
                      backgroundColor: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [theme.colors.grayDark, theme.colors.violet],
                      })
                    }]
                  }
                  key={`loading_point_${index}`}
                />
              )}

            </Animated.View>
          </RadialGradient>
        </RadialGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
  },
  spinner: {
    width: 200,
    height: 200,
  },
  nameText: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 42,
    color: theme.colors.white
  },
  welcomeText: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 26,
    color: theme.colors.gold
  },
  welcomeView: {
    marginBottom: 26,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontSize: 48,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.fonts.default,
    fontSize: 28,
    color: 'rgba(255,255,255,0.5)',
  },
  bottomText: {
    flex: 2,
    alignSelf: 'center',
    marginBottom: 76,
    justifyContent: 'flex-end',
  },
  logoView: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 100,
  },
  logo: {
    height: Layout.window.height * 600 / 724,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  loadingPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.grayDark,
    marginLeft: 15,
    marginRight: 15,
  },
  indicator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});

export default LoadingScreen;
