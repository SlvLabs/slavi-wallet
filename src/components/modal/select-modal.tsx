import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseModal, {ModalProps} from './base-modal';
import {CheckBox, Icon} from 'react-native-elements';
import theme from '../../theme';

export interface SelectModalProps extends ModalProps {
  onSelect: (value: string) => void;
  options: Record<string, string>;
  current?: string;
  header?: string;
}

const keyExtractor = (item: any, index: number) => index.toString();

export function SelectModal(props: SelectModalProps) {
  const {options, current, header, onSelect, ...other} = props;
  const {onCancel} = props;

  const renderParamsElement = useCallback(
    ({item: [value, label]}) => {
      console.log('renderParamsElement');
      console.log(value + ' - ' + label);
      return (
        <TouchableOpacity
          onPress={() => {
            onSelect(value);
            onCancel?.();
          }}
          style={styles.itemContainer}>
          <CheckBox
            uncheckedColor={theme.colors.lightTransparent}
            checkedColor={theme.colors.green}
            checked={value === current}
            uncheckedIcon={
              <Icon
                type='material-community'
                name='checkbox-blank-circle-outline'
                color={theme.colors.lightTransparent}
              />}
            checkedIcon={
              <Icon
                type='material-community'
                name='circle-slice-8'
                color={theme.colors.green}
              />
            }
          />
          <Text style={styles.itemText}>{label}</Text>
        </TouchableOpacity>
      )
    },
        [onCancel, current, onSelect]
  );

  console.log('MODAL')
  console.log(header);
  console.log(options);
  return (
    <BaseModal {...other}>
      <View style={styles.container}>
        {!!header && (
          <View style={styles.header}>
            <Text style={styles.title}>{header}</Text>
          </View>
        )}
        <View style={styles.list}>
          <FlatList
            data={Object.entries(options)}
            renderItem={renderParamsElement}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </BaseModal>
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
    color: theme.colors.lightGray,
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
    color: theme.colorsOld.darkGray,
  },
  itemText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.maxTransparent,
    alignItems: 'center',
    marginLeft: -16,
  },
});
