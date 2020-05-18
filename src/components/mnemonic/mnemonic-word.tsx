import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';

export interface MnemonicWordProps {
  word: string;
  onPressWord?: (word: string) => void;
}

const MnemonicWord = (props: MnemonicWordProps) => {
  const {word, onPressWord} = props;

  const disabled = typeof onPressWord !== 'function';
  const onPress = useCallback(() => onPressWord(word), [onPressWord, word]);

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}>
      <Text>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    alignSelf: 'flex-start',
    textAlign: 'center',
    margin: 5,
  },
});

export default MnemonicWord;
