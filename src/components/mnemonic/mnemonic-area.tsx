import {View, StyleSheet, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import MnemonicWord from './mnemonic-word';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface MnemonicAreaProps {
  words: string[];
  showWordIndex?: boolean;
  style?: ViewStyle;
  wordStyle?: ViewStyle;
  onPressWorld?: (word: string, index?: number) => void;
}

const   MnemonicArea = (props: MnemonicAreaProps) => {
  const {words, style, onPressWorld, wordStyle, showWordIndex} = props;

  const renderWorld = useCallback(
    (word: string, index: number) => {
      return (
        <MnemonicWord
          word={word}
          key={`word_${index}`}
          onPressWord={(word) => onPressWorld?.(word, index)}
          style={wordStyle}
          index={showWordIndex ? index+1 : undefined}
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
    paddingTop: Layout.isSmallDevice ? 20 : 40,
    paddingBottom: Layout.isSmallDevice ? 20 : 40,
    borderBottomColor: theme.colors.textDarkGray,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default MnemonicArea;
