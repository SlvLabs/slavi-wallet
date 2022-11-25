import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import theme from '../../theme';

export interface SelectableListProps {
  onSelect: (value: string) => void;
  options: Record<string, string>;
  current?: string;
  containerStyle?: ViewStyle;
}

const keyExtractor = (item: any, index: number) => index.toString();

export default function SelectableList(props: SelectableListProps) {
  const {options, current, onSelect, containerStyle} = props;

  const lastElementIndex = useMemo(() => Object.keys(options).length - 1, [options]);

  const renderParamsElement = useCallback(
    ({item: [value, label], index}) => {
      const isLast = index === lastElementIndex;
      return (
        <TouchableOpacity
          onPress={() => {
            onSelect(value);
          }}
          style={isLast ? {...styles.itemContainer, ...styles.lastItemContainer} : styles.itemContainer}>
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
            onPress={() => {
              onSelect(value);
            }}
          />
          <Text style={styles.itemText}>{label}</Text>
        </TouchableOpacity>
      )
    },
    [current, onSelect, lastElementIndex]
  );

  return <FlatList
    data={Object.entries(options)}
    renderItem={renderParamsElement}
    keyExtractor={keyExtractor}
    style={{...styles.container, ...containerStyle}}
  />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
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
  lastItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  }
});
