import {InteractionManager, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {ListItem} from 'react-native-elements';
import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import theme from '../../theme';
import {useFiatSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Screen from '../../components/screen';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {useDeleteAccount} from '../../hooks/useDeleteAccount';
import {useLogout} from '../../hooks/useLogout';
import {getReadableVersion, getVersion} from 'react-native-device-info';

const chevron = <ListItem.Chevron color={theme.colors.textLightGray} size={22} />;

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const currentCurrency = useFiatSelector();
  const authService = useAuthService();

  const goToMnemonicExport = useCallback(
    () =>
      InteractionManager.runAfterInteractions(() => {
        authService.forbid();
        navigation.navigate(ROUTES.SETTINGS.EXPORT_MNEMONIC);
      }),
    [navigation, authService],
  );
  const goToMnemonicImport = useCallback(() => {
    authService.forbid();
    navigation.navigate(ROUTES.SETTINGS.IMPORT_MNEMONIC);
  }, [authService, navigation]);
  const goToLanguage = useCallback(
    () => InteractionManager.runAfterInteractions(() => navigation.navigate(ROUTES.SETTINGS.LANGUAGE)),
    [navigation],
  );
  const goToCurrencyChange = useCallback(() => navigation.navigate(ROUTES.SETTINGS.CURRENCY_CHANGE), [navigation]);

  const goToInvalidateCache = useCallback(() => navigation.navigate(ROUTES.SETTINGS.INVALIDATE_CACHES), [navigation]);

  const goToNotificationSettings = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.NOTIFICATION_SETTINGS),
    [navigation],
  );

  const goToReferral = useCallback(() => navigation.navigate(ROUTES.SETTINGS.REFERRAL), [navigation]);

  const goToWalletConnect = useCallback(() => navigation.navigate(ROUTES.SETTINGS.WALLET_CONNECT), [navigation]);

  const goToSecurity = useCallback(() => {
    authService.forbid();
    navigation.navigate(ROUTES.SETTINGS.SECURITY);
  }, [navigation, authService]);

  const {modal: deleteAccountModal, show: showDeleteAccount} = useDeleteAccount();
  const {modal: logoutModal, show: showLogout} = useLogout();

  return (
    <Screen title={t('Settings')} disableBackButton={true}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scroll}>
        <ListItem key={'head_1'} bottomDivider disabled={true} containerStyle={{...styles.listItem}}>
          <ListItem.Content>
            <ListItem.Title style={styles.header}>{t('General')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem key={'language'} bottomDivider onPress={goToLanguage} containerStyle={styles.listItem}>
          <ListItem.Content style={styles.content}>
            <ListItem.Title style={styles.title}>{t('Language')}</ListItem.Title>
            <Text style={styles.subText}>{t(i18n.language as TranslationsKey)}</Text>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'currency'} bottomDivider onPress={goToCurrencyChange} containerStyle={styles.listItem}>
          <ListItem.Content style={styles.content}>
            <ListItem.Title style={styles.title}>{t('Currency')}</ListItem.Title>
            <Text style={styles.subText}>{currentCurrency}</Text>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'cache'} bottomDivider onPress={goToInvalidateCache} containerStyle={styles.listItem}>
          <ListItem.Content style={styles.content}>
            <ListItem.Title style={styles.title}>{t('Clear cache')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'push'} bottomDivider onPress={goToNotificationSettings} containerStyle={styles.listItem}>
          <ListItem.Content style={styles.content}>
            <ListItem.Title style={styles.title}>{t('Push notifications')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'referral'} bottomDivider onPress={goToReferral} containerStyle={styles.listItem}>
          <ListItem.Content style={styles.content}>
            <ListItem.Title style={{...styles.title, ...styles.highlightedTitle}}>{t('referralTitle')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>

        <ListItem
          key={'head_2'}
          bottomDivider
          disabled={true}
          containerStyle={{...styles.listItem, ...styles.headerContainer}}>
          <ListItem.Content>
            <ListItem.Title style={styles.header}>{t('Private')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem key={'item_6'} bottomDivider onPress={goToMnemonicExport} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('Export mnemonic phrase')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'item_7'} bottomDivider onPress={goToMnemonicImport} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('Import new mnemonic phrase')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'wallet_connect'} bottomDivider onPress={goToWalletConnect} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('walletConnect')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'security'} bottomDivider onPress={goToSecurity} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('security')}</ListItem.Title>
          </ListItem.Content>
          {chevron}
        </ListItem>
        <ListItem key={'deleteAccount'} bottomDivider onPress={showDeleteAccount} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('deleteAccount')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem key={'logout'} bottomDivider onPress={showLogout} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{t('logout')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <View style={styles.versionView}>
          <Text style={styles.version}>{`${t('version')}: ${
            Platform.OS === 'ios' ? getReadableVersion() : getVersion()
          }`}</Text>
        </View>
      </KeyboardAwareScrollView>
      {deleteAccountModal}
      {logoutModal}
    </Screen>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'transparent',
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomColor: theme.colors.maxTransparent,
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.white,
  },
  highlightedTitle: {
    color: theme.colors.gold2,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
  headerContainer: {
    paddingTop: 32,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subText: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.borderGreen,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  versionView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  version: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
});

export default SettingsScreen;
