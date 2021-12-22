import React, {useCallback, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import theme from '../../../theme';
import CustomIcon from '../../custom-icon/custom-icon';
import OperationFilterModal from './operation-filter-modal';
import CoinsFilterModal from './coins-filter-modal';
import {useTranslation} from 'react-i18next';
import TypeFilterModal from './type-filter-modal';
import StatusFilterModal from './status-filter-modal';
import AddressFilterModal from './address-filter-modal';
import ScrollFilterChip from './scroll-filter-chip';
import {OperationListParams} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import OperationStatus from '@slavi/wallet-core/src/utils/operation-list/operation-status';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import {useDidUpdateEffect} from '@slavi/wallet-core';
import {Moment} from 'moment';
import FullFilterDate from './full-filter-date';

export interface OperationListFilterProps {
  containerStyle?: ViewStyle;
  filter: (params: OperationListParams) => void;
  hideCoinsFilter?: boolean;
}

const OperationListFilter = (props: OperationListFilterProps) => {
  const {t} = useTranslation();

  const [fullModalShown, setFullModalShown] = useState<boolean>(false);
  const [coinModalShown, setCoinModalShown] = useState<boolean>(false);
  const [statusModalShown, setStatusModalShown] = useState<boolean>(false);
  const [typeModalShown, setTypeModalShown] = useState<boolean>(false);
  const [addressModalShown, setAddressModalShown] = useState<boolean>(false);
  const [datePickerShown, setDatePickerShown] = useState<boolean>(false);

  const [coins, setCoins] = useState<string[]>([]);
  const [address, setAddress] = useState<string>();
  const [statuses, setStatuses] = useState<OperationStatus[]>([]);
  const [types, setTypes] = useState<OperationType[]>([]);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [finishDate, setFinishDate] = useState<Moment | null>(null);

  const hideFilter = useCallback(() => setFullModalShown(false), []);
  const showFilter = useCallback(() => setFullModalShown(true), []);
  const hideCoinFilter = useCallback(() => setCoinModalShown(false), []);
  const showCoinFilter = useCallback(() => setCoinModalShown(true), []);

  const showStatusFilter = useCallback(() => setStatusModalShown(true), []);
  const hideStatusFilter = useCallback(() => setStatusModalShown(false), []);
  const showTypeFilter = useCallback(() => setTypeModalShown(true), []);
  const hideTypeFilter = useCallback(() => setTypeModalShown(false), []);
  const showAddressFilter = useCallback(() => setAddressModalShown(true), []);
  const hideAddressFilter = useCallback(() => setAddressModalShown(false), []);
  const showDatePicker = useCallback(() => setDatePickerShown(true), []);
  const hideDatePicker = useCallback(() => setDatePickerShown(false), []);

  const submitCoinFilter = useCallback(
    (_coins: string[]) => {
      setCoins(_coins);
      hideCoinFilter();
    },
    [hideCoinFilter],
  );

  const submitAddressFilter = useCallback(
    (_address?: string) => {
      setAddress(_address);
      hideAddressFilter();
    },
    [hideAddressFilter],
  );

  const submitStatusFilter = useCallback(
    (_statuses: OperationStatus[]) => {
      setStatuses(_statuses);
      hideStatusFilter();
    },
    [hideStatusFilter],
  );

  const submitTypesFilter = useCallback(
    (_types: OperationType[]) => {
      setTypes(_types);
      hideTypeFilter();
    },
    [hideTypeFilter],
  );

  const submitDatesFilter = useCallback(
    (start: Moment | null, finish: Moment | null) => {
      setStartDate(start);
      setFinishDate(finish);
      hideTypeFilter();
    },
    [hideTypeFilter],
  );

  const coinsIsActive = useMemo<boolean>(
    () => coins && coins.length > 0,
    [coins],
  );
  const typesIsActive = useMemo<boolean>(
    () => types && types.length > 0,
    [types],
  );
  const statusesIsActive = useMemo<boolean>(
    () => statuses && statuses.length > 0,
    [statuses],
  );
  const addressesIsActive = useMemo<boolean>(() => !!address, [address]);
  const datesIsActive = useMemo<boolean>(
    () => !!startDate && !!finishDate,
    [finishDate, startDate],
  );

  useDidUpdateEffect(() => {
    props.filter({
      coins: coins,
      address: address,
      statuses: statuses,
      types: types,
      createdFrom: startDate?.valueOf(),
      createdTo: finishDate?.valueOf(),
    });
  }, [props.filter, coins, address, statuses, types, startDate, finishDate]);

  return (
    <ScrollView
      style={{...styles.container, ...props.containerStyle}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.chip} onPress={showFilter}>
        <CustomIcon name={'full-filter'} size={18} color={theme.colors.green}/>
      </TouchableOpacity>
      {!props.hideCoinsFilter && (
        <ScrollFilterChip
          text={t('Coins')}
          onPress={showCoinFilter}
          active={coinsIsActive}
        />
      )}
      <ScrollFilterChip
        text={t('Date')}
        onPress={showDatePicker}
        active={datesIsActive}
      />
      <ScrollFilterChip
        text={t('Status')}
        onPress={showStatusFilter}
        active={statusesIsActive}
      />
      <ScrollFilterChip
        text={t('Type')}
        onPress={showTypeFilter}
        active={typesIsActive}
      />
      <ScrollFilterChip
        text={t('Address')}
        onPress={showAddressFilter}
        active={addressesIsActive}
      />
      <OperationFilterModal
        visible={fullModalShown}
        onCancel={hideFilter}
        selectedCoins={coins}
        submitCoins={setCoins}
        submitStatuses={setStatuses}
        selectedStatuses={statuses}
        selectedTypes={types}
        submitTypes={setTypes}
        submitDates={submitDatesFilter}
        startDate={startDate}
        finishDate={finishDate}
        address={address}
        submitAddress={setAddress}
        hideCoinsFilter={props.hideCoinsFilter}
      />
      <CoinsFilterModal
        visible={coinModalShown}
        onCancel={hideCoinFilter}
        onSubmit={submitCoinFilter}
        selectedCoins={coins}
      />
      <TypeFilterModal
        visible={typeModalShown}
        onCancel={hideTypeFilter}
        selectedTypes={types}
        onSubmit={submitTypesFilter}
      />
      <StatusFilterModal
        visible={statusModalShown}
        onCancel={hideStatusFilter}
        onSubmit={submitStatusFilter}
        selectedStatuses={statuses}
      />
      <AddressFilterModal
        visible={addressModalShown}
        onCancel={hideAddressFilter}
        onSubmit={submitAddressFilter}
        address={address}
      />
      <FullFilterDate
        onStartDateChange={setStartDate}
        onFinishDateChange={setFinishDate}
        startDate={startDate}
        finishDate={finishDate}
        visible={datePickerShown}
        onClose={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: theme.colors.cardBackground3,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 17,
    paddingLeft: 17,
    justifyContent: 'center',
    flex: 1,
  },
  dateContainer: {
    flex: 1,
  },
});

export default OperationListFilter;
