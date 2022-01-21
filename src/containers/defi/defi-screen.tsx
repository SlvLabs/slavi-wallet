import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, ImageBackground, Text, TextInput, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {loadingBackground, screenStub} from '../../assets/images';
import theme from '../../theme';
import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import CustomIcon from '../../components/custom-icon/custom-icon';
import Layout from '../../utils/layout';
import {useWSRequest} from '@slavi/wallet-core';
import {
  SubscribeData,
  SubscribeList,
  SubscribeListData,
  SubscribeListResponse,
  SubscribeResponse,
  Subscribe
} from '@slavi/wallet-core/src/providers/ws/messages/subscribe';
import SolidButton from '../../components/buttons/solid-button';

const SUBSCRIBE_KEY = 'defi';

const DefiScreen = () => {
  const [subscribed, setSubscribed] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {state: {data, error: getError, isLoading}, request} = useWSRequest<SubscribeListData, SubscribeListResponse>();
  const {
    state: {
      data: postData,
      isLoading: postLoading,
      error: postError,
      errors,
    },
    request: post
  } = useWSRequest<SubscribeData, SubscribeResponse>();
  const {t} = useTranslation();

  useEffect(() => {
    request(SubscribeList());
  }, []);

  useEffect(() => {
    if(!isLoading && data?.available && !data?.available.includes(SUBSCRIBE_KEY)) {
      setSubscribed(true);
      const existsEmail = data.subscribed?.find(element => element.type === SUBSCRIBE_KEY);
      if(existsEmail) {
        setEmail(existsEmail.email);
      }
    } else {
      setSubscribed(false);
    }
  }, [data, isLoading]);

  const subscribe = useCallback(() => {
    post(Subscribe({
      email: email,
      flags: [SUBSCRIBE_KEY],
    }))
  }, [email]);

  useEffect(() => {
    if(getError) {
      setError(getError)
    }
  }, [getError]);

  useEffect(() => {
    if(postError) {
      setError(postError)
    }
  }, [postError]);

  useEffect(() => {
    if(errors?.email) {
      setError(errors.email?.[0]);
    }
  }, [errors]);

  useEffect(() => {
    if(!postLoading && postData?.success) {
      setSubscribed(true);
    }
  }, [postData, postLoading]);

  const onEmailChange = useCallback((email: string) => {
    setError('');
    setEmail(email);
  }, []);

  const border = useMemo(() => {
    if(error) {
      return theme.colors.errorRed;
    }

    if(postData?.success) {
      return theme.colors.green;
    }

    return theme.colors.borderGray;
  }, [error, subscribed]);

  console.log('subscribed ' + SUBSCRIBE_KEY);
  console.log(data?.subscribed || subscribed)

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loadingBackground} style={styles.background}>
        <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradient}>
          <Image
            source={screenStub}
            width={Layout.isSmallDevice ? 205 : 310}
            height={Layout.isSmallDevice ? 165 :245}
            style={{
              width: Layout.isSmallDevice ? 205 : 310,
              height: Layout.isSmallDevice ? 165 :245}}
          />
          <Text style={styles.header}>{t('Slavi DeFi is coming...')}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{t('Comprehensive with versatile functionality,')}</Text>
            <Text style={styles.description}>{t('the first version of Slavi DeFi is coming.')}</Text>
            <Text style={styles.description}>{t('Stay tunes in Newsletter.')}</Text>
          </View>
          {(!!data && !isLoading) && (
            <View style={{width: '100%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={t('Your Email')}
                  style={{...styles.input, borderColor: border}}
                  placeholderTextColor={theme.colors.textLightGray}
                  editable={!subscribed}
                  selectTextOnFocus={!subscribed}
                  textContentType={'emailAddress'}
                  value={email}
                  onChangeText={onEmailChange}
                />
                {subscribed && (
                  <CustomIcon
                    name={'check'}
                    color={theme.colors.green}
                    size={14}
                    style={styles.icon}
                  />
                )}
              </View>
              {!!error && <Text style={styles.error}>{t(error as TranslationsKey)}</Text>}
              {(data?.subscribed?.find((element) => element.type == SUBSCRIBE_KEY) || subscribed) ? (
                <Text style={styles.subscribedText}>{t('You\'ve successfully subscribed')}</Text>
              ) : (
                <SolidButton
                  icon={
                    <CustomIcon
                      name={'arrow-right'}
                      color={theme.colors.white}
                      size={14}
                      style={styles.buttonIcon}
                    />
                  }
                  iconRight={true}
                  title={t('Subscribe')}
                  onPress={subscribe}
                  containerStyle={styles.buttonContainer}
                  disabled={isLoading || postLoading || !!error}
                />
              )}
          </View>)}
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
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
  },
  description: {
    fontFamily: theme.fonts.default,
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
    lineHeight: 16,
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
    flex: 10,
  },
  inputPlaceHolder: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  buttonContainer: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
  },
  inputContainer: {
    width: '100%',
    paddingRight: 32,
    paddingLeft: 32,
    paddingBottom: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  subscribedText: {
    fontFamily: theme.fonts.default,
    color: theme.colors.green,
    alignSelf: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 18,
  },
  icon: {
    marginLeft: -32,
    flex: 1,
  },
  buttonIcon: {
    marginLeft: 18,
  },
  error: {
    fontFamily: theme.fonts.default,
    color: theme.colors.errorRed,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: 16,
    paddingLeft: 32,
  }
});

export default DefiScreen;
