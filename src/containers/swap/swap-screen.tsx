import React from 'react';
import {Image, ImageBackground, Text, TextInput, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {loadingBackground, screenStub} from '../../assets/images';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/custom-icon/custom-icon';

const SwapScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradient}>
          <Image source={screenStub} width={288} height={223} style={{width: 288, height: 223}}/>
          <Text style={styles.header}>{t('Slavi Swap is coming...')}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{t('Comprehensive with versatile functionality,')}</Text>
            <Text style={styles.description}>{t('the first version of Slavi DeFi is coming.')}</Text>
            <Text style={styles.description}>{t('Stay tunes in Newsletter.')}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={t('Your Email')}
              style={styles.input}
              placeholderTextColor={theme.colors.textLightGray}
            />
          </View>
          <View style={styles.buttonContainer}>
            <LinearGradient {...theme.gradients.button} style={styles.button} >
              <Text style={styles.buttonText}>{t('Subscribe')}</Text>
              <CustomIcon name={'arrow-right'} color={theme.colors.white} size={14} style={styles.buttonText}/>
            </LinearGradient>
          </View>
        </RadialGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignSelf: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 26,
    color: theme.colors.white,
  },
  description: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 21,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingBottom: 40,
  },
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: theme.colors.grayDark,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    color: theme.colors.white,
  },
  inputPlaceHolder: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  button: {
    borderRadius: 44,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    alignSelf: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 18,
  },
  buttonContainer: {
    width: '100%',
    paddingRight: 32,
    paddingLeft: 32,
  },
  inputContainer: {
    width: '100%',
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 24,
  }
});

export default SwapScreen;
