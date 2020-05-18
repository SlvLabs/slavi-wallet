import {SafeAreaView} from 'react-native';
import React, {useCallback} from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';

const SettingsScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goToMnemonicExport = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.EXPORT_MNEMONIC),
    [navigation],
  );
  const goToMnemonicImport = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.IMPORT_MNEMONIC),
    [navigation],
  );
  const goToLanguage = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.LANGUAGE),
    [navigation],
  );
  const goToCurrencyChange = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.CURRENCY_CHANGE),
    [navigation],
  );

  const goToInvalidateCache = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.INVALIDATE_CACHES),
    [navigation],
  );

  return (
    <SafeAreaView>
      <ListItem key={1} bottomDivider onPress={goToMnemonicExport}>
        <Icon name="export" type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{t('Export mnemonic phrase')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem key={2} bottomDivider onPress={goToMnemonicImport}>
        <Icon name="import" type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{t('Import new mnemonic phrase')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem key={3} bottomDivider onPress={goToLanguage}>
        <Icon name="language" type="material" />
        <ListItem.Content>
          <ListItem.Title>{t('Change language')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem key={4} bottomDivider onPress={goToCurrencyChange}>
        <Icon name="currency-usd" type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{t('Change currency')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem key={5} bottomDivider onPress={goToInvalidateCache}>
        <Icon name="cached" type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{t('Invlidate caches')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </SafeAreaView>
  );
};

export default SettingsScreen;
