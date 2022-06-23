import FullScreenModal from '../modal/full-screen-modal';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CurrencySelectList from './currency-select-list';
import {Currency} from './currency-select';

export interface CurrencySelectModalProps {
  visible: boolean;
  currencies: Currency[];
  onCancel: () => void;
  onElementPress: (currency: Currency) => void;
}

export default function CurrencySelectModal(props: CurrencySelectModalProps) {
  const {currencies, onElementPress, onCancel, visible} = props;

  return (
    <FullScreenModal visible={visible} onCancel={onCancel} hideCloseButton={true}>
      <View style={styles.container}>
        <CurrencySelectList currencies={currencies} onElementPress={onElementPress} onBackPress={onCancel} />
      </View>
    </FullScreenModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
  },
});
