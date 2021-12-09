import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardTypeOptions,
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
}

const SimpleInput = (props: SimpleInputProps) => {
  let disabledStyle: ViewStyle = {};
  let errorStyle: ViewStyle = {};

  const [focusStyle, setFocusStyle] = useState<ViewStyle>({});

  if (props.disabled) {
    disabledStyle = {
      backgroundColor: theme.colors.borderGray,
      borderWidth: 1,
      borderColor: theme.colorsOld.darkGray,
    };
  }

  if (props.errorMessage) {
    errorStyle = {
      backgroundColor: theme.colors.grayDark,
      borderWidth: 1,
      borderColor: theme.colors.red,
    };
  }

  const onFocus = useCallback(() => {
    setFocusStyle(styles.focused);
  }, []);

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

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
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
    </View>
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
    flex: 2,
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
