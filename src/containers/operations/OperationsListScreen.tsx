import {StyleSheet, View} from 'react-native';
import React from 'react';
import OperationsList from '../../components/operations/operations-list';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import Screen from '../../components/screen';
import useTranslation from '../../utils/use-translation';
import Spinner from '../../components/spinner';

const OperationsListScreen = () => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({});

  const {t} = useTranslation();

  return (
    <Screen title={t('Operations history')} disableBackButton={true}>
      { isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      )}
      <OperationsList
        sections={operations}
        onEndReached={getMore}
        filter={updateParams}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default OperationsListScreen;
