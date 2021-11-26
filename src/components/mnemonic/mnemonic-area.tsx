import {View, StyleSheet, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import MnemonicWord from './mnemonic-word';
import theme from '../../theme';

export interface MnemonicAreaProps {
  words: string[];
  style?: ViewStyle;
  wordStyle?: ViewStyle;
  onPressWorld?: (word: string) => void;
}

const MnemonicArea = (props: MnemonicAreaProps) => {
  const {words, style, onPressWorld, wordStyle} = props;

  const renderWorld = useCallback(
    (word: string, key: number) => {
      return (
        <MnemonicWord
          word={word}
          key={key}
          onPressWord={onPressWorld}
          style={wordStyle}
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
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomColor: theme.colors.textDarkGray,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default MnemonicArea;
