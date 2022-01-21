import React, {useEffect, useState} from 'react';
import FullFilterSection from './full-filter-section';
import useTranslation from '../../../utils/use-translation';
import FullFilterChipList, {ChipData} from './full-filter-chip-list';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';

export interface FullFilterTypeSectionProps {
  onSubmit: (statuses: OperationType[]) => void;
  selectedTypes: OperationType[];
}

const types = Object.entries(OperationType).map(
  ([key, value]): ChipData => ({id: key, text: value}),
);

const FullFilterTypeSection = (props: FullFilterTypeSectionProps) => {
  const {onSubmit, selectedTypes: initialSelectedTypes} = props;

  const {t} = useTranslation();

  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(
    () =>
      setSelectedTypes(
        Object.fromEntries(initialSelectedTypes.map(type => [type, true])),
      ),
    [initialSelectedTypes],
  );

  const onTypePress = (chip: string) => {
    const selected: OperationType[] = [];
    Object.entries({
      ...selectedTypes,
      [chip]: !selectedTypes[chip],
    }).forEach(([key, value]) => {
      if (value) {
        selected.push(key as OperationType);
      }
    });
    onSubmit(selected);
  };

  return (
    <FullFilterSection title={t('Type')}>
      <FullFilterChipList
        chips={types}
        onSelect={onTypePress}
        selectedChips={selectedTypes}
      />
    </FullFilterSection>
  );
};

export default FullFilterTypeSection;
