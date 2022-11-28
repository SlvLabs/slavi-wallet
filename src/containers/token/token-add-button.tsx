import useTranslation from '../../utils/use-translation';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import ROUTES from '../../navigation/config/routes';
import SolidButton from '../../components/buttons/solid-button';

const TokenAddButton = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onPress = useCallback(
    () => navigation.navigate(ROUTES.COINS.FULL_LIST),
    [navigation],
  );

  return <SolidButton onPress={onPress} title={t('Add token')} />;
};

export default TokenAddButton;
