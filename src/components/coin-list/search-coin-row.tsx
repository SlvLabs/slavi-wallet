import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import useTranslation from '../../utils/use-translation';
import SearchParamsButton, {ParamsItem} from './search-params-button';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface FilterTag {
  key: any;
  name: string;
}

export interface SearchCoinRowProps {
  onSearch(search: string): void;
  onAddPress(): void;
  sortingMethods: ParamsItem[];
  search: string;
  onClear: () => void;
}

const SearchCoinRow = (props: SearchCoinRowProps) => {
  const {
    onSearch,
    sortingMethods,
    onAddPress,
    search,
    onClear,
  } = props;

  const {t} = useTranslation();
  const clearIcon = (
    <Icon
      name={'close'}
      type={'antdesign'}
      size={24}
      color={theme.colors.lightGray}
      onPress={onClear}
    />
  );
  const searchIcon = (
    <CustomIcon name="search" size={24} color={theme.colors.hardTransparent} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            style={styles.searchBar}
            placeholder={t('Search')}
            lightTheme={true}
            onChangeText={onSearch}
            value={search}
            clearIcon={false}
            inputContainerStyle={styles.searchBarInput}
            placeholderTextColor={theme.colors.hardTransparent}
            searchIcon={search ? clearIcon : searchIcon}
          />
        </View>
        <View style={styles.sortContainer}>
          <SearchParamsButton
            sortingMethods={sortingMethods}
            icon={
              <CustomIcon
                name="sort"
                size={24}
                color={theme.colors.hardTransparent}
              />
            }
            header={t('Sort coins by')}
          />
        </View>
        <TouchableOpacity style={styles.addingContainer} onPress={onAddPress}>
          <CustomIcon name="add" size={24} color={theme.colors.hardTransparent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  searchRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkBackground,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 7,
  },
  sortContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  addingContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  settingsContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    color: theme.colors.mediumTransparent,
    fontSize: 17,
    lineHeight: 24,
    fontFamily: theme.fonts.default,
  },
  searchBarInput: {
    backgroundColor: 'transparent',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  sortIcon: {
    width: 24,
    height: 24,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
});

export default SearchCoinRow;
