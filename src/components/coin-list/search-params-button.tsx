import {
  FlatList,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseModal from '../modal/base-modal';
import theme from '../../theme';
import {CheckBox, Icon} from 'react-native-elements';

export interface ParamsItem {
  title: string;
  onPress(): void;
  isActive?: boolean;
}

export interface SortButtonProps {
  sortingMethods: ParamsItem[];
  icon: Element;
  header?: string;
  iconStyle?: ImageStyle;
}

const SearchParamsButton = (props: SortButtonProps) => {
  const [visible, setVisible] = useState(false);

  const hideOverlay = () => setVisible(false);
  const showOverlay = () => setVisible(true);

  const renderParamsElement = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          hideOverlay();
          item.onPress();
        }}
        style={styles.itemContainer}>
        <CheckBox
          uncheckedColor={theme.colors.lightTransparent}
          checkedColor={theme.colors.green}
          checked={item.isActive}
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
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <View>
      <TouchableOpacity onPress={showOverlay}>{props.icon}</TouchableOpacity>
      <BaseModal visible={visible} onCancel={hideOverlay}>
        <View>
          {!!props.header && (
            <View style={styles.header}>
              <Text style={styles.title}>{props.header}</Text>
            </View>
          )}
          <View style={styles.list}>
            <FlatList
              data={props.sortingMethods}
              renderItem={renderParamsElement}
              keyExtractor={keyExtractor}
            />
          </View>
        </View>
      </BaseModal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchParamsButton;
