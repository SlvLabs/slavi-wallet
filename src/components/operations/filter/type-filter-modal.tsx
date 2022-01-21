import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import FullScreenModal from '../../modal/full-screen-modal';
import useTranslation from '../../../utils/use-translation';
import FullFilterChipList, {ChipData} from './full-filter-chip-list';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import theme from '../../../theme';

export interface TypeFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (statuses: OperationType[]) => void;
  selectedTypes: OperationType[];
}

const types = Object.entries(OperationType).map(
  ([key, value]): ChipData => ({id: key, text: value}),
);

const TypeFilterModal = (props: TypeFilterModalProps) => {
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
    setSelectedTypes({
      ...selectedTypes,
      [chip]: !selectedTypes[chip],
    });
  };

  const submit = useCallback(() => {
    const selected: OperationType[] = [];
    Object.entries(selectedTypes).forEach(([key, value]) => {
      if (value) {
        selected.push(key as OperationType);
      }
    });
    onSubmit(selected);
  }, [onSubmit, selectedTypes]);

  return (
    <FullScreenModal
      visible={props.visible}
      onCancel={props.onCancel}
      title={t('Select types')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <ScrollView>
        <FullFilterChipList
          chips={types}
          onSelect={onTypePress}
          selectedChips={selectedTypes}
        />
      </ScrollView>
    </FullScreenModal>
  );
};

export default TypeFilterModal;
