import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import FullScreenModal from '../../modal/full-screen-modal';
import useTranslation from '../../../utils/use-translation';
import FullFilterCoinSection from './full-filter-coin-section';
import FullFilterDateSection from './full-filter-date-section';
import FullFilterStatusSection from './full-filter-status-section';
import FullFilterTypeSection from './full-filter-type-section';
import theme from '../../../theme';
import OperationStatus from '@slavi/wallet-core/src/utils/operation-list/operation-status';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import {Moment} from 'moment';
import FullFilterAddressSection from './full-filter-address-section';

export interface OperationFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  submitCoins: (coins: string[]) => void;
  selectedCoins: string[];
  selectedStatuses: OperationStatus[];
  submitStatuses: (statuses: OperationStatus[]) => void;
  selectedTypes: OperationType[];
  submitTypes: (statuses: OperationType[]) => void;
  submitDates: (start: Moment | null, finish: Moment | null) => void;
  startDate: Moment | null;
  finishDate: Moment | null;
  address?: string;
  submitAddress: (address?: string) => void;
  hideCoinsFilter?: boolean;
}

const OperationFilterModal = (props: OperationFilterModalProps) => {
  const {
    selectedCoins: initialSelectedCoins,
    selectedStatuses: initialSelectedStatuses,
    selectedTypes: initialSelectedTypes,
    startDate: initialStartDate,
    finishDate: initialFinishDate,
    address: initialAddress,
    submitCoins,
    submitStatuses,
    submitTypes,
    submitDates,
    submitAddress,
    onCancel,
  } = props;

  const {t} = useTranslation();

  const [selectedCoins, setSelectedCoins] = useState<string[]>(
    props.selectedCoins,
  );
  const [selectedStatuses, setSelectedStatuses] = useState<OperationStatus[]>(
    props.selectedStatuses,
  );
  const [selectedTypes, setSelectedTypes] = useState<OperationType[]>(
    props.selectedTypes,
  );
  const [startDate, setStartDate] = useState<Moment | null>(initialStartDate);
  const [finishDate, setFinishDate] =
    useState<Moment | null>(initialFinishDate);

  const [address, setAddress] = useState<string | undefined>(initialAddress);

  useEffect(() => {
    setSelectedCoins(initialSelectedCoins);
    setSelectedStatuses(initialSelectedStatuses);
    setSelectedTypes(initialSelectedTypes);
    setStartDate(initialStartDate || null);
    setFinishDate(initialFinishDate || null);
    setAddress(initialAddress);
  }, [
    initialFinishDate,
    initialSelectedCoins,
    initialSelectedStatuses,
    initialSelectedTypes,
    initialStartDate,
    initialAddress,
  ]);

  const submit = useCallback(() => {
    submitCoins(selectedCoins);
    submitStatuses(selectedStatuses);
    submitStatuses(selectedStatuses);
    submitDates(startDate, finishDate);
    submitAddress(address);
    onCancel();
  }, [
    submitCoins,
    selectedCoins,
    submitStatuses,
    selectedStatuses,
    submitDates,
    startDate,
    finishDate,
    submitAddress,
    address,
    onCancel,
  ]);

  return (
    <FullScreenModal
      visible={props.visible}
      onCancel={props.onCancel}
      title={t('Filters')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <ScrollView>
        {!props.hideCoinsFilter && (
          <FullFilterCoinSection
            selectedCoins={selectedCoins}
            submitCoins={setSelectedCoins}
          />
        )}
        <FullFilterDateSection
          startDate={startDate}
          finishDate={finishDate}
          onStartDateChange={setStartDate}
          onFinishDateChange={setFinishDate}
        />
        <FullFilterStatusSection
          selectedStatuses={selectedStatuses}
          onSubmit={setSelectedStatuses}
        />
        <FullFilterTypeSection
          selectedTypes={selectedTypes}
          onSubmit={submitTypes}
        />
        <FullFilterAddressSection
          onAddressChange={setAddress}
          address={address}
        />
      </ScrollView>
    </FullScreenModal>
  );
};

export default OperationFilterModal;
