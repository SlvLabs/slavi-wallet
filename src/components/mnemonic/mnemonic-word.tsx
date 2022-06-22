import {Text, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface MnemonicWordProps {
  word: string;
  index?: number;
  onPressWord?: (word: string) => void;
  style?: ViewStyle;
}

const MnemonicWord = (props: MnemonicWordProps) => {
  const {word, onPressWord, style, index} = props;

  const disabled = typeof onPressWord !== 'function';
  const onPress = useCallback(() => onPressWord?.(word), [onPressWord, word]);

  return (
    <TouchableOpacity
      style={{...styles.container, ...(!!index ? styles.containerWithIndex : {}), ...style}}
      disabled={disabled}
      onPress={onPress}>
      {!!index && <Text style={styles.index}>{index}</Text>}
      <Text style={styles.label}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    textAlign: 'center',
    margin: Layout.isSmallDevice ? 2 : 5,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    alignSelf: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    color: theme.colors.textLightGray2,
  },
  index: {
    marginRight: Layout.isSmallDevice ? 4 : 8,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.placeholderText,
    minWidth: 14,
  },
  containerWithIndex: {
    justifyContent: 'flex-start',
  },
});

export default MnemonicWord;
