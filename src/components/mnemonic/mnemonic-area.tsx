import {View, StyleSheet, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import MnemonicWord from './mnemonic-word';

export interface MnemonicAreaProps {
  words: string[];
  style?: ViewStyle;
  onPressWorld?: (word: string) => void;
}

const MnemonicArea = (props: MnemonicAreaProps) => {
  const {words, style, onPressWorld} = props;

  const renderWorld = useCallback(
    (word: string, key: number) => {
      return (
        <MnemonicWord
          word={word}
          key={key}
          onPressWord={onPressWorld}
        />
      );
    },
    [onPressWorld],
  );

  return <View style={[styles.area, style]}>{words.map(renderWorld)}</View>;
};

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default MnemonicArea;
