import React, {useCallback, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import PageHeader from '../../components/page-header';
import PageDescription from '../../components/settings/page-description';
import InsertableTextArea from '../../components/controls/insertable-text-area';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {store} from '@slavi/wallet-core';
import {useTranslation} from 'react-i18next';

const MnemonicImportScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onImport = useCallback(() => {
    Alert.alert(
      t('Attention!'),
      t(
        'By importing a new passphrase, you may lose access to existing addresses. Make sure to save all private keys.',
      ),
      [
        {
          text: t('Back'),
          style: 'cancel',
        },
        {
          text: t('ОК'),
          onPress: () => dispatch(store.ImportMnemonic(mnemonic)),
        },
      ],
    );
  }, [dispatch, mnemonic, t]);

  return (
    <SafeAreaView>
      <PageHeader text={t('Enter your secret phrase')} />
      <PageDescription
        text={t(
          'Enter the secret phrase from another wallet. Usually it is 12, sometimes more, words separated by spaces',
        )}
      />
      <InsertableTextArea onChange={(value: string) => setMnemonic(value)} />
      <Button title={'Import'} onPress={onImport} />
    </SafeAreaView>
  );
};

export default MnemonicImportScreen;
