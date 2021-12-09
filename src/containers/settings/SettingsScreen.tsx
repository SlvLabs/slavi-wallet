import {InteractionManager, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';
import {ListItem} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import theme from '../../theme';
import {useFiatSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';

const chevron = <ListItem.Chevron color={theme.colors.textLightGray} size={22}/>;

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const currentCurrency = useFiatSelector();

  const goToMnemonicExport = useCallback(
    () => InteractionManager.runAfterInteractions(
      () => navigation.navigate(ROUTES.SETTINGS.EXPORT_MNEMONIC)
    ),
    [navigation],
  );
  const goToMnemonicImport = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.IMPORT_MNEMONIC),
    [navigation],
  );
  const goToLanguage = useCallback(
    () => InteractionManager.runAfterInteractions(
    () => navigation.navigate(ROUTES.SETTINGS.LANGUAGE)
    ), [navigation]);
  const goToCurrencyChange = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.CURRENCY_CHANGE),
    [navigation],
  );

  const goToInvalidateCache = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.INVALIDATE_CACHES),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ListItem
        key={'head_1'}
        bottomDivider
        disabled={true}
        containerStyle={{...styles.listItem, ...styles.headerContainer}}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.header}>{t('General')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem key={3} bottomDivider onPress={goToLanguage} containerStyle={styles.listItem}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.title}>{t('Language')}</ListItem.Title>
          <Text style={styles.subText}>{t(i18n.language)}</Text>
        </ListItem.Content>
        {chevron}
      </ListItem>
      <ListItem key={4} bottomDivider onPress={goToCurrencyChange} containerStyle={styles.listItem}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.title}>{t('Currency')}</ListItem.Title>
          <Text style={styles.subText}>{currentCurrency}</Text>
        </ListItem.Content>
        {chevron}
      </ListItem>
      <ListItem key={5} bottomDivider onPress={goToInvalidateCache} containerStyle={styles.listItem}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.title}>{t('Clear cache')}</ListItem.Title>
        </ListItem.Content>
        {chevron}
      </ListItem>

      <ListItem
        key={'head_2'}
        bottomDivider
        disabled={true}
        containerStyle={{...styles.listItem, ...styles.headerContainer}}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.header}>{t('Private')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem key={1} bottomDivider onPress={goToMnemonicExport} containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{t('Export mnemonic phrase')}</ListItem.Title>
        </ListItem.Content>
        {chevron}
      </ListItem>
      <ListItem key={2} bottomDivider onPress={goToMnemonicImport} containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{t('Import new mnemonic phrase')}</ListItem.Title>
        </ListItem.Content>
        {chevron}
      </ListItem>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
    height: '100%',
  },
  listItem: {
    backgroundColor: 'transparent',
    marginRight: 16,
    marginLeft: 16,
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
});

export default SettingsScreen;
