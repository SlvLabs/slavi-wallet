import React, {useCallback} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useCoinsService, useServices} from '@slavi/wallet-core';
import {useDispatch} from 'react-redux';
import {
  setGlobalLoading,
  unsetGlobalLoading,
} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';

const InvalidateCachesScreen = () => {
  const {t, i18n} = useTranslation();
  const {languageService} = useServices();
  const dispatch = useDispatch();
  const coinsService = useCoinsService();

  const confirm = useCallback(
    (onConfirm: () => void) => {
      Alert.alert(t('Confirmation'), t('Are you sure?'), [
        {
          text: t('Ok'),
          onPress: onConfirm,
        },
        {
          text: t('Cancel'),
          style: 'cancel',
        },
      ]);
    },
    [t],
  );

  const invalidateCoinsCache = useCallback(async () => {
    dispatch(setGlobalLoading());
    await coinsService.invalidateCache();
    dispatch(unsetGlobalLoading());
  }, [coinsService, dispatch]);

  const invalidateLanguageCache = useCallback(async () => {
    if(!languageService) {
      throw new Error('Language service not initialized');
    }
    await languageService.invalidateCache();
    await i18n.reloadResources();
  }, []);

  return (
    <SafeAreaView>
      <ListItem
        key={1}
        bottomDivider
        onPress={() => confirm(invalidateCoinsCache)}>
        <Icon name="coins" type="font-awesome-5" />
        <ListItem.Content>
          <ListItem.Title>{t('Invalidate coins cache')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        key={2}
        bottomDivider
        onPress={() => confirm(invalidateLanguageCache)}>
        <Icon name="language" type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{t('Invalidate language cache')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </SafeAreaView>
  );
};

export default InvalidateCachesScreen;
