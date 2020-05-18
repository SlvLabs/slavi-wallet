import {SafeAreaView, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const ImportAccountMenuScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <Text>{t('Import account menu screen')}</Text>
    </SafeAreaView>
  );
};

export default ImportAccountMenuScreen;
