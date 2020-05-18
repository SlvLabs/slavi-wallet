import React from 'react';
import {StyleSheet, View} from 'react-native';
import FilterTag, {FilterTagProps} from './filter-tag';

export interface FilterTagListProps {
  tags: FilterTagProps[];
}

const FilterTagList = (props: FilterTagListProps) => {
  return (
    <View style={styles.container}>
      {props.tags.map((tag, index) => (
        <FilterTag {...tag} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default FilterTagList;
