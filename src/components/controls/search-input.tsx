import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  inputContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

const SearchInput = (props: SearchInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  const focusedStyle = focused ? styles.focusedInput : {};

  const clear = useCallback(() => props.onChange?.(''), [props.onChange]);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View
        style={{
          ...styles.inputContainer,
          ...focusedStyle,
          ...props.inputContainerStyle,
        }}>
        {!focused && (
          <CustomIcon
            name={'search'}
            color={theme.colorsOld.lightGray}
            size={24}
            style={styles.icon}
          />
        )}
        <TextInput
          onChangeText={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          style={{...styles.input, ...props.inputStyle}}
          placeholderTextColor={theme.colorsOld.lightGray}
          selectTextOnFocus={true}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {(focused || !!props.value) && (
          <TouchableOpacity onPress={clear} style={styles.icon}>
            <CustomIcon
              name={'close'}
              color={theme.colorsOld.lightGray}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    padding: 16,
  },
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    padding: 0,
    flex: 10,
  },
  focusedInput: {
    backgroundColor: theme.colorsOld.white,
    shadowColor: theme.colorsOld.gray,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    shadowOpacity: 0.32,
    elevation: 16,
  },
  icon: {
    paddingRight: 8,
  },
});

export default SearchInput;
