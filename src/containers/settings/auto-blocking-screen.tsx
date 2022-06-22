import {StyleSheet, View} from 'react-native';
import SelectableList from '../../components/controls/selectable-list';
import React, {useCallback, useState} from 'react';
import theme from '../../theme';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import useAutoBlockOptions from '../../utils/use-auto-block-options';
import Screen from '../../components/screen';
import useTranslation from '../../utils/use-translation';

export default function AutoBlockingScreen() {
  const authService = useAuthService();
  const options = useAutoBlockOptions();

  const [value, setValue] = useState<string>(`${authService.getAutoBlockTimeout()}`);

  const onChange = useCallback((_value: string) => {
    authService.setAutoBlockTimeout(+_value).then(() => setValue(_value));
  }, [authService]);

  const {t} = useTranslation();

  return (
    <Screen title={t('autoBlocking')}>
      <View style={styles.content}>
        <SelectableList onSelect={onChange} options={options} current={value}/>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.screenBackground,
  },
  content: {
    padding: 16,
  },
});
