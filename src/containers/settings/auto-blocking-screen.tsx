import {SafeAreaView, StyleSheet, View} from 'react-native';
import SelectableList from '../../components/controls/selectable-list';
import React, {useCallback, useState} from 'react';
import theme from '../../theme';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import useAutoBlockOptions from '../../utils/use-auto-block-options';

export default function AutoBlockingScreen() {
  const authService = useAuthService();
  const options = useAutoBlockOptions();

  const [value, setValue] = useState<string>(`${authService.getAutoBlockTimeout()}`);

  const onChange = useCallback((_value: string) => {
    authService.setAutoBlockTimeout(+_value).then(() => setValue(_value));
  }, [authService]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SelectableList onSelect={onChange} options={options} current={value}/>
      </View>
    </SafeAreaView>
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
