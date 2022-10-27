import {useNotificationSettings} from '@slavi/wallet-core/src/providers/ws/hooks/use-notification-settings';
import Screen from '../../components/screen';
import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import {NotificationSettings} from '@slavi/wallet-core/src/providers/ws/messages/notification';
import theme from '../../theme';
import Layout from '../../utils/layout';
function allDisabled(): NotificationSettings {
  return {enabled: false, staking: false, swap: false, nft: false, crypto: false, smartContract: false};
}

interface SwitchRowProps {
  label: string;
  value: boolean;
  setValue(value: boolean): void;
  disabled: boolean;
}

function SwitchRow({value, setValue, label, disabled}: SwitchRowProps) {
  return (
    <View style={styles.switchRow}>
      <Text style={disabled ? styles.switchRowTextDisabled : styles.switchRowText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        thumbColor={theme.colors.white}
        trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
      />
    </View>
  );
}

function SwitchRowBig({value, setValue, label, disabled}: SwitchRowProps) {
  return (
    <View style={styles.switchRowBig}>
      <Text style={disabled ? styles.switchRowTextDisabled : styles.switchRowText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        thumbColor={theme.colors.white}
        trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
      />
    </View>
  );
}

export default function NotificationSettingsScreen() {
  const {get, settings, initError, initLoading, setError, save} = useNotificationSettings();

  const {t} = useTranslation();
  const [formState, _setFormState] = useState<NotificationSettings>(allDisabled);

  const setFormState = useCallback(
    (setStateArg: Partial<NotificationSettings>) => {
      const newValue: NotificationSettings = {...formState, ...setStateArg};
      _setFormState(newValue);
      save(newValue);
    },
    [save, formState],
  );

  // на старте вызываем инициализацию от сервера
  useEffect(() => {
    get();
  }, [get]);

  // При инициализации и при обновлении после сохранения
  useEffect(() => {
    if (settings) {
      _setFormState(settings);
    }
  }, [settings]);

  const setValue: {[k in keyof NotificationSettings]: (v: boolean) => void} = useMemo(
    () => ({
      nft: newV => setFormState({nft: newV}),
      smartContract: newV => setFormState({smartContract: newV}),
      swap: newV => setFormState({swap: newV}),
      staking: newV => setFormState({staking: newV}),
      crypto: newV => setFormState({crypto: newV}),
      enabled: newV => setFormState(newV ? {enabled: newV} : allDisabled()),
    }),
    [setFormState],
  );
  if (initLoading) {
    return (
      <Screen title={t('PushNotificationHeader')}>
        <View />
      </Screen>
    );
  }
  if (initError) {
    return (
      <Screen title={t('PushNotificationHeader')}>
        <View>
          <Text style={styles.error}>{initError}</Text>
        </View>
      </Screen>
    );
  }
  return (
    <Screen title={t('PushNotificationHeader')}>
      <View style={styles.container}>
        <SwitchRowBig
          label={t('pushNotifications')}
          value={formState.enabled}
          setValue={setValue.enabled}
          disabled={false}
        />
        <View style={styles.optionsWrap}>
          <Text style={styles.options}>{t('Options')}</Text>
        </View>
        <SwitchRow
          label={t('cryptoOperations')}
          value={formState.crypto}
          setValue={setValue.crypto}
          disabled={!formState.enabled}
        />
        <SwitchRow
          label={t('nftOperations')}
          value={formState.nft}
          setValue={setValue.nft}
          disabled={!formState.enabled}
        />
        <SwitchRow
          label={t('stakingOperations')}
          value={formState.staking}
          setValue={setValue.staking}
          disabled={!formState.enabled}
        />
        <SwitchRow
          label={t('swapOperations')}
          value={formState.swap}
          setValue={setValue.swap}
          disabled={!formState.enabled}
        />
        <SwitchRow
          label={t('smartContractOperations')}
          value={formState.smartContract}
          setValue={setValue.smartContract}
          disabled={!formState.enabled}
        />
        <View>
          <Text style={styles.error}>{setError || ''}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Layout.isSmallDevice ? 4 : 10,
    paddingBottom: Layout.isSmallDevice ? 4 : 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  switchRowBig: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Layout.isSmallDevice ? 8 : 14,
    paddingBottom: Layout.isSmallDevice ? 8 : 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
    borderTopWidth: 1,
    borderTopColor: theme.colors.maxTransparent,
  },
  switchRowText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 14 : 15,
    lineHeight: 32,
    color: theme.colors.white,
  },
  switchRowTextDisabled: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 14 : 15,
    lineHeight: 32,
    color: theme.colors.textLightGray,
  },
  container: {},
  error: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colors.red,
    paddingTop: 6,
    paddingBottom: 6,
  },
  optionsWrap: {
    marginTop: Layout.isSmallDevice ? 24 : 32,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  options: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 13 : 14,
    lineHeight: 28,
    color: theme.colors.textLightGray,
    textTransform: 'capitalize',
  },
});
