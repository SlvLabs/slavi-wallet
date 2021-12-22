import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import FullScreenModal from '../../modal/full-screen-modal';
import {useTranslation} from 'react-i18next';
import FullFilterChipList, {ChipData} from './full-filter-chip-list';
import OperationStatus from '@slavi/wallet-core/src/utils/operation-list/operation-status';
import theme from '../../../theme';

export interface StatusFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (statuses: OperationStatus[]) => void;
  selectedStatuses: OperationStatus[];
}

const statuses = Object.entries(OperationStatus).map(
  ([_, value]): ChipData => ({id: value, text: value}),
);

const StatusFilterModal = (props: StatusFilterModalProps) => {
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
    setSelectedStatuses({
      ...selectedStatuses,
      [chip]: !selectedStatuses[chip],
    });
  };

  const submit = useCallback(() => {
    const selected: OperationStatus[] = [];
    Object.entries(selectedStatuses).forEach(([key, value]) => {
      if (value) {
        selected.push(key as OperationStatus);
      }
    });
    onSubmit(selected);
  }, [onSubmit, selectedStatuses]);

  return (
    <FullScreenModal
      visible={props.visible}
      onCancel={props.onCancel}
      title={t('Select statuses')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <ScrollView>
        <FullFilterChipList
          chips={statuses}
          selectedChips={selectedStatuses}
          onSelect={onStatusPress}
        />
      </ScrollView>
    </FullScreenModal>
  );
};

export default StatusFilterModal;
