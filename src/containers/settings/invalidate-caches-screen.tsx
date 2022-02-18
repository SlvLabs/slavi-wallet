import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import useTranslation from '../../utils/use-translation';
import {useCoinsService, useServices} from '@slavi/wallet-core';
import {useDispatch} from 'react-redux';
import {
  setGlobalLoading,
  unsetGlobalLoading,
} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';
import theme from '../../theme';

import ConfirmationModal from '../../components/modal/confirmation-modal';
import { View } from 'react-native';

enum ConfirmationState {
  hidden,
  coins,
  languages
}

const InvalidateCachesScreen = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationState>(ConfirmationState.hidden);

  const {t, i18n} = useTranslation();
  const {languageService} = useServices();
  const dispatch = useDispatch();
  const coinsService = useCoinsService();

  const showLanguageConf = useCallback(() => setConfirmation(ConfirmationState.languages),[]);
  const showCoinsConf = useCallback(() => setConfirmation(ConfirmationState.coins),[]);
  const hideConf = useCallback(() => setConfirmation(ConfirmationState.hidden), []);

  const confIsShown = useMemo(() => confirmation !== ConfirmationState.hidden, [confirmation]);

  const confirmationText = useMemo(() => {
    switch (confirmation) {
      case ConfirmationState.coins:
        return t('Are you sure you want to delete your coin cache data?');
      case ConfirmationState.languages:
        return t('Are you sure you want to delete your translations cache data?')
      default:
        return '';
    }
  }, [confirmation]);

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

  const onConfirm = useCallback(() => {
    switch (confirmation) {
      case ConfirmationState.coins:
        invalidateCoinsCache();
        break;
      case ConfirmationState.languages:
        invalidateLanguageCache();
        break;
    }
  }, [confirmation, invalidateCoinsCache, invalidateLanguageCache]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ListItem
          key={'invalidate_1'}
          onPress={showCoinsConf}
          containerStyle={styles.itemContainer}
        >
          <ListItem.Content style={{backgroundColor: 'transparent'}}>
            <ListItem.Title style={styles.label}>{t('Invalidate coins cache')}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.textLightGray} size={22}/>
        </ListItem>
        <ListItem
          key={'invalidate_2'}
          onPress={showLanguageConf}
          containerStyle={styles.itemContainer}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.label}>{t('Invalidate language cache')}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={theme.colors.textLightGray} size={22} />
        </ListItem>
        <ConfirmationModal
          onPositive={onConfirm}
          title={t('Confirmation')}
          visible={confIsShown}
          onCancel={hideConf}
          description={confirmationText}
          positiveText={t('Yes')}
          negativeText={t('No')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.screenBackground,
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  }
});

export default InvalidateCachesScreen;
