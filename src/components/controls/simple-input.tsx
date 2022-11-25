import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  KeyboardTypeOptions, ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../../theme';

export interface SimpleInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: React.ReactNode;
  onIconPress?: () => void;
  errorMessage?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle | TextStyle;
  errorContainerStyle?: ViewStyle;
  errorStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
  placeholderTextColor?: string,
  iconLeft?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  disableFocusStyle?: boolean;
  disableErrorStyle?: boolean;
  skipDisabledStyle?: boolean;
}

const SimpleInput = (props: SimpleInputProps) => {
  let disabledStyle: ViewStyle = {};
  let errorStyle: ViewStyle = {};

  const [focusStyle, setFocusStyle] = useState<ViewStyle>({});

  const input = useRef<TextInput | null>(null);

  if (props.disabled && !props.skipDisabledStyle) {
    disabledStyle = {
      backgroundColor: theme.colors.borderGray,
      borderWidth: 1,
      borderColor: theme.colorsOld.darkGray,
    };
  }

  if (props.errorMessage && !props.disableErrorStyle) {
    errorStyle = {
      backgroundColor: theme.colors.grayDark,
      borderWidth: 1,
      borderColor: theme.colors.red,
    };
  }

  const onFocus = useCallback(() => {
    if(!disabledStyle) {
      setFocusStyle(styles.focused);
    }
  }, [props.disableFocusStyle]);

  const onBlur = useCallback(() => {
    setFocusStyle({});
  }, []);

  const IconElement = useMemo<React.ReactNode>(() => (
    props.icon && (
      <TouchableOpacity onPress={props.onIconPress} style={styles.iconWrap}>
        {props.icon}
      </TouchableOpacity>
      )
  ), [props.icon, props.onIconPress]);

  const onContainerClick = useCallback(() => input.current?.focus(), [input.current]);

  return (
    <TouchableOpacity style={{...styles.container, ...props.containerStyle}} onPress={onContainerClick}>
      <View
        style={{
          ...styles.inputContainer,
          ...focusStyle,
          ...disabledStyle,
          ...errorStyle,
          ...props.inputContainerStyle,
        }}>
        {props.iconLeft && IconElement}
        <View style={styles.leftCol}>
          {!!props.label && (
            <Text style={styles.label}>{props.label}</Text>
          )}
          <TextInput
            onChangeText={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            style={{...styles.input, ...props.inputStyle}}
            selectTextOnFocus={true}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType={props.keyboardType}
            placeholderTextColor={props.placeholderTextColor}
            returnKeyType={props.returnKeyType}
            editable={!props.disabled}
            ref={(_input) => {
              if(input) {
                input.current = _input;
              }
            }}
          />
        </View>
        {!!props.buttonText && (
          <TouchableOpacity
            onPress={props.onButtonPress}
            style={styles.buttonWrap}>
            <Text style={styles.button}>{props.buttonText}</Text>
          </TouchableOpacity>
        )}
        {!props.iconLeft && IconElement}
      </View>
      {!!props.errorMessage && (
        <View style={{...styles.errorContainer, ...props.errorContainerStyle}}>
          <Text style={{...styles.error, ...props.errorStyle}}>
            {props.errorMessage}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    padding: 16,
  },
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray2,
    padding: 0,
  },
  button: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 28,
    letterSpacing: 0.01,
    color: theme.colors.darkGreen1,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  buttonWrap: {
    flex: 3,
  },
  iconWrap: {
    flex: 1,
    marginLeft: 8,
  },
  errorContainer: {
    padding: 8,
  },
  error: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colors.red,
  },
  focused: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.borderGray,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray1,
  },
  leftCol: {
    flexDirection: 'column',
    flex: 8,
  }
});

export default SimpleInput;
