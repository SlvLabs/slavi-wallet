import React, {useCallback} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useCoinsService} from '@slavi/wallet-core';
import {useDispatch} from 'react-redux';
import {
  setGlobalLoading,
  unsetGlobalLoading,
} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';

const InvalidateCachesScreen = () => {
  const {t} = useTranslation();
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
    </SafeAreaView>
  );
};

export default InvalidateCachesScreen;
