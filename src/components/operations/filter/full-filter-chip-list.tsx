import React from 'react';
import {StyleSheet, View} from 'react-native';
import FullFilterChip from './full-filter-chip';

export interface ChipData {
  id: string;
  text: string;
}

export interface FullFilterChipListProps {
  chips: ChipData[];
  selectedChips: Record<string, boolean>;
  onSelect: (chip: string) => void;
}

const FullFilterChipList = (props: FullFilterChipListProps) => {
  return (
    <View style={styles.container}>
      {props.chips.map((chip, index) => (
        <FullFilterChip
          title={chip.text}
          selected={props.selectedChips[chip.id]}
          onPress={() => props.onSelect(chip.id)}
          key={`chip_${index}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FullFilterChipList;
