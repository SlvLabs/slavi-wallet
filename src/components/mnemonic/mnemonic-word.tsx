import {Text, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface MnemonicWordProps {
  word: string;
  onPressWord?: (word: string) => void;
  style?: ViewStyle;
}

const MnemonicWord = (props: MnemonicWordProps) => {
  const {word, onPressWord, style} = props;

  const disabled = typeof onPressWord !== 'function';
  const onPress = useCallback(() => onPressWord?.(word), [onPressWord, word]);

  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.label}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Layout.isSmallDevice ? 55 : 90,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    textAlign: 'center',
    margin: Layout.isSmallDevice ? 2 : 5,
  },
  label: {
    alignSelf: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    color: theme.colors.textLightGray2,
  },
});

export default MnemonicWord;
