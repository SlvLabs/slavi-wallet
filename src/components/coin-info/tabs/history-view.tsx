import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import useOperationsList, {OperationListParams} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import OperationsList from '../../operations/operations-list';

export interface HistoryViewProps {
  coin: string;
}

const HistoryView = (props: HistoryViewProps) => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({
    coins: [props.coin],
  });
  const _updateParams = useCallback(
    (params: OperationListParams) => {
      updateParams({...params, coins: [props.coin]});
    },
    [updateParams, props.coin],
  );

  return (
    <View style={styles.container}>
      <OperationsList
        sections={operations}
        onEndReached={getMore}
        filter={_updateParams}
        placeholderStyle={styles.placeholder}
        hideCoinsFilter={true}
      />
      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  placeholder: {
    paddingTop: 50,
  },
});

export default HistoryView;
