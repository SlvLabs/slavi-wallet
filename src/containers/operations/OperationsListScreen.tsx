import {ActivityIndicator} from 'react-native';
import React from 'react';
import OperationsList from '../../components/operations/operations-list';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import Screen from '../../components/screen';
import useTranslation from '../../utils/use-translation';

const OperationsListScreen = () => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({});
  const fiat = useFiatSelector() || 'USD';
  const crypto = useCryptoSelector() || 'BTC';

  const {t} = useTranslation();

  return (
    <Screen title={t('Operations history')} disableBackButton={true}>
      <OperationsList
        sections={operations}
        fiatTicker={fiat}
        cryptoTicker={crypto}
        onEndReached={getMore}
        filter={updateParams}
      />
      {isLoading && <ActivityIndicator />}
    </Screen>
  );
};

export default OperationsListScreen;
