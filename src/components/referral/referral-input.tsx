import React, {useMemo} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import SimpleInput from '../controls/simple-input';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

export interface ReferralInputProps {
  value: string;
  onChange: (value: string) => void;
  onButtonPress: () => void;
  isError?: boolean;
  isSuccess?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  buttonStyle?: TextStyle;
  buttonText?: string;
}

export function ReferralInput({
  onChange,
  value,
  isError,
  isSuccess,
  onButtonPress,
  containerStyle,
  buttonStyle,
  buttonText,
  inputStyle,
}: ReferralInputProps) {
  const icon = useMemo(
    () =>
      isSuccess ? <CustomIcon name={'check'} size={14} color={theme.colors.green} style={styles.icon} /> : undefined,
    [isSuccess],
  );

  return (
    <SimpleInput
      onChange={onChange}
      value={value}
      returnKeyType={'done'}
      inputContainerStyle={
        isError
          ? {...styles.container, ...containerStyle, ...styles.errorContainer}
          : isSuccess
          ? {...styles.container, ...containerStyle, ...styles.successContainer}
          : {...styles.container, ...containerStyle}
      }
      onButtonPress={onButtonPress}
      buttonText={buttonText}
      buttonStyle={
        isError ? {...styles.button, ...buttonStyle, ...styles.errorButton} : {...styles.button, ...buttonStyle}
      }
      icon={icon}
      textAlign={'center'}
      inputStyle={isSuccess ? {...styles.input, ...inputStyle, ...styles.inputSuccess} : styles.input}
      disabled={isSuccess}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.violet,
    width: '100%',
  },
  errorContainer: {
    borderColor: theme.colors.red,
  },
  button: {
    fontFamily: theme.fonts.default,
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.violet,
  },
  errorButton: {
    color: theme.colors.red,
  },
  input: {
    paddingLeft: 80,
  },
  inputSuccess: {
    paddingRight: 40,
  },
  icon: {
    marginLeft: 20,
  },
  successContainer: {
    borderColor: theme.colors.green,
  },
});
