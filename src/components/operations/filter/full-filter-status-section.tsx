import React, {useEffect, useState} from 'react';
import FullFilterSection from './full-filter-section';
import useTranslation from '../../../utils/use-translation';
import FullFilterChipList, {ChipData} from './full-filter-chip-list';
import OperationStatus from '@slavi/wallet-core/src/utils/operation-list/operation-status';

export interface FullFilterStatusSectionProps {
  onSubmit: (statuses: OperationStatus[]) => void;
  selectedStatuses: OperationStatus[];
}

const statuses = Object.entries(OperationStatus).map(
  ([key, value]): ChipData => ({id: key, text: value}),
);

const FullFilterStatusSection = (props: FullFilterStatusSectionProps) => {
  const {onSubmit, selectedStatuses: initialSelectedStatuses} = props;

  const {t} = useTranslation();

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, boolean>
  >({});

  useEffect(
    () =>
      setSelectedStatuses(
        Object.fromEntries(
          initialSelectedStatuses.map(status => [status, true]),
        ),
      ),
    [initialSelectedStatuses],
  );

  const onStatusPress = (chip: string) => {
    const selected: OperationStatus[] = [];
    Object.entries({
      ...selectedStatuses,
      [chip]: !selectedStatuses[chip],
    }).forEach(([key, value]) => {
      if (value) {
        selected.push(key as OperationStatus);
      }
    });
    onSubmit(selected);
  };

  return (
    <FullFilterSection title={t('Status')}>
      <FullFilterChipList
        chips={statuses}
        selectedChips={selectedStatuses}
        onSelect={onStatusPress}
      />
    </FullFilterSection>
  );
};

export default FullFilterStatusSection;
