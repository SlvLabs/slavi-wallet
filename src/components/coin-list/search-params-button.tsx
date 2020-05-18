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

export interface ParamsItem {
  title: string;
  onPress(): void;
  icon?: Element;
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
        <View style={styles.itemIcon}>{item.icon}</View>
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
    borderBottomColor: theme.colorsOld.pink,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
  list: {
    width: 200,
    maxHeight: 300,
    paddingTop: 16,
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
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  itemIcon: {
    paddingRight: 8,
    width: 32,
  },
});

export default SearchParamsButton;
