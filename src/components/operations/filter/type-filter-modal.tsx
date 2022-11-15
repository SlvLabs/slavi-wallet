import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import FullScreenModal from '../../modal/full-screen-modal';
import useTranslation from '../../../utils/use-translation';
import FullFilterChipList from './full-filter-chip-list';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import theme from '../../../theme';
import {availableType} from './available-filter-type';

export interface TypeFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (statuses: OperationType[]) => void;
  selectedTypes: OperationType[];
}

const TypeFilterModal = (props: TypeFilterModalProps) => {
  const {onSubmit, selectedTypes: initialSelectedTypes, visible} = props;

  const {t} = useTranslation();

  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (visible) {
      setSelectedTypes(Object.fromEntries(initialSelectedTypes.map(type => [type, true])));
    }
  }, [initialSelectedTypes, visible]);

  const onTypePress = useCallback((chip: string) => {
    setSelectedTypes(p => ({
      ...p,
      [chip]: !p[chip],
    }));
  }, []);

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
      visible={visible}
      onCancel={props.onCancel}
      title={t('Select types')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <ScrollView>
        <FullFilterChipList chips={availableType} onSelect={onTypePress} selectedChips={selectedTypes} />
      </ScrollView>
    </FullScreenModal>
  );
};

export default TypeFilterModal;
