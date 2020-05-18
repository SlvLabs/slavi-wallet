import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {useGetParentCoins} from '@slavi/wallet-core';
import ErrorScreenContent from '../../components/error/error-screen-content';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-community/picker';
import {ParentCoin} from '@slavi/wallet-core/src/providers/ws/hooks/use-get-parent-coins';
import theme from '../../theme';

export interface ParentCoinSelectProps {
  onValueChange(value: string): void;
}

const errorHeader = 'Something went wrong';
const errorText = 'Please try again later or contact support';

const ParentCoinSelect = (props: ParentCoinSelectProps) => {
  const {t} = useTranslation();
  const requestState = useGetParentCoins();

  if (requestState.isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (requestState.error || !Array.isArray(requestState.coins)) {
    return <ErrorScreenContent header={t(errorHeader)} text={t(errorText)} />;
  }

  return (
    <View>
      <Text>{t('Select parent coin')}</Text>
      <Picker
        onValueChange={(itemValue) => props.onValueChange(itemValue as string)}>
        {requestState.coins.map((element: ParentCoin) => (
          <Picker.Item
            label={element.name}
            value={element.id}
            key={element.id}
            color={
              (element.allowAddChild
                ? theme.colorsOld.text
                : theme.colors.dark) as string
            }
          />
        ))}
      </Picker>
    </View>
  );
};

export default ParentCoinSelect;
