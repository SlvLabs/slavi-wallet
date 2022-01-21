import React, {useCallback} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../../components/custom-icon/custom-icon';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {useRoute} from '@react-navigation/core';
import {CoinSuccessfullySendingRouteProps} from '../../navigation/CoinsStack';
import Layout from '../../utils/layout';

const SuccessfullySendingScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<CoinSuccessfullySendingRouteProps>();

  const homeOnPress = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.TABS.OPERATIONS,
          },
        ],
      }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('Success')}</Text>
      </View>
      <View style={styles.content}>
        <CustomIcon name={'check'} size={Layout.isSmallDevice ? 64 : 64} color={theme.colors.gold2} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{t('Successfully sent')}</Text>
          <Text style={styles.description}>
            {Object.keys(route.params.recipients).length > 1
              ? t('To addresses')
              : t('To address')}
          </Text>
          {route.params.recipients.map(({address, amount}, index) => (
            <Text
              style={{...styles.description, ...styles.boldText}}
              key={`recipient_${index}`}>
              {`${address}: ${amount} ${route.params.ticker}`}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.controls}>
        <SolidButton title={t('Home')} onPress={homeOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 48,
    lineHeight: 56,
    color: theme.colors.gold2,
  },
  content: {
    alignItems: 'center',
    flex: Layout.isSmallDevice ? 2 : 5,
    justifyContent: 'space-around',
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
  controls: {
    flex: 1,
    paddingRight: 64,
    paddingLeft: 64,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  gradient: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 64,
  }
});

export default SuccessfullySendingScreen;
