import React from 'react';
import {StyleSheet, View} from 'react-native';
import CoinSelectList, {CoinsSelectListProps} from './coins-select-list';
import FullScreenModal from '../modal/full-screen-modal';

export interface CoinsSelectModalProps extends CoinsSelectListProps {
  visible: boolean;
  onCancel: () => void;
}

export default function CoinsSelectModal(props: CoinsSelectModalProps) {
  const {coins, onElementPress, balanceShown, onCancel, visible} = props;

  return (
    <FullScreenModal visible={visible} onCancel={onCancel}>
      <View style={styles.container}>
        <CoinSelectList
          coins={coins}
          balanceShown={balanceShown}
          onElementPress={onElementPress}
        />
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  container: {},
});
