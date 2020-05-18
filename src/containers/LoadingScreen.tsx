import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../store';
import {downLogo} from '../assets/images';
import theme from '../theme';

interface LoadingScreenProps {
  loadingText?: string;
}

const LoadingScreen = (props: LoadingScreenProps) => {
  const {loadingText} = props;
  const connectionError = useSelector((state: State) => state.connection.error);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <Image source={downLogo} style={styles.logo} />
      </View>
      <View style={styles.bottomText}>
        {loadingText != null && (
          <Text style={styles.loadingText}>{loadingText}...</Text>
        )}
        {connectionError && (
          <Text>Problem connecting to the server try again later</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 120,
    letterSpacing: 1,
    color: theme.colorsOld.text.gray,
  },
  title: {
    fontSize: 48,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.5)',
  },
  bottomText: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
});

export default LoadingScreen;
