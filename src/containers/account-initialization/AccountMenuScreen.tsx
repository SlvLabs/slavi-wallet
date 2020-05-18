import {Text, View, InteractionManager, SafeAreaView} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import ROUTES from '../../navigation/config/routes';

const AccountMenuScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const onPressCreate = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.CREATE_MNEMONIC);
    });
  }, [navigation]);

  const onPressImport = useCallback(() => {
    Toast.show(t('Coming soon'));
  }, [t]);

  return (
    <SafeAreaView>
      <Text>Account menu screen</Text>
      <View>
        <Button title={t('Create')} onPress={onPressCreate} />
        <Button title={t('Import')} onPress={onPressImport} />
      </View>
    </SafeAreaView>
  );
};

export default AccountMenuScreen;
