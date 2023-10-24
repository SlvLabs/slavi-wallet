import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseAuthedModal from './base-authorized-modal';
import theme from '../../theme';
import SelectableList from '../controls/selectable-list';
import {ModalProps} from "./base-modal";

export interface SelectModalProps extends ModalProps {
  onSelect: (value: string) => void;
  options: Record<string, string>;
  current?: string;
  header?: string;
}

export function SelectModal(props: SelectModalProps) {
  const {options, current, header, onSelect, ...other} = props;
  const {onCancel} = props;

  const _onSelect = useCallback(
    (value: string) => {
      onSelect(value);
      onCancel?.();
    },
    [onSelect, onCancel],
  );

  return (
    <BaseAuthedModal {...other}>
      <View style={styles.container}>
        {!!header && (
          <View style={styles.header}>
            <Text style={styles.title}>{header}</Text>
          </View>
        )}
        <View style={styles.list}>
          <SelectableList onSelect={_onSelect} options={options} current={current} />
        </View>
      </View>
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    width: '100%',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  list: {
    maxHeight: 300,
    width: '100%',
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.4,
    color: theme.colors.lightGray,
  },
});
