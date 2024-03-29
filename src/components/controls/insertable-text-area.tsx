import React, {useCallback, useRef} from 'react';
import {StyleSheet, TextInput, TextStyle, View, ViewStyle, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface CopiedTextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  inputStyle?: TextStyle;
  lineNumber?: number;
}

export const DEFAULT_LINE_NUMBER = 5;

const InsertableTextArea = ({
  value,
  onChange,
  containerStyle,
  buttonStyle,
  inputStyle,
  lineNumber,
}: CopiedTextAreaProps) => {
  const onPress = useCallback(async () => {
    Clipboard.getString().then(onChange);
  }, [onChange]);

  const {t} = useTranslation();

  const inputRef = useRef<TextInput>(null);

  const onPressContainer = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.buttonRow}>
        <Button
          title={t('Insert')}
          type="clear"
          style={{...styles.button, ...buttonStyle}}
          titleStyle={styles.buttonTittle}
          onPress={onPress}
        />
        {!value && (
          <TouchableOpacity onPress={onPressContainer}>
            <Text style={styles.placeholder}>{t('Enter here...')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={{...styles.input, ...inputStyle}}
        numberOfLines={lineNumber || DEFAULT_LINE_NUMBER}
        value={value}
        onChangeText={onChange}
        textAlignVertical={'top'}
        selectionColor={theme.colors.darkWord}
        multiline={true}
        returnKeyType={'done'}
        enablesReturnKeyAutomatically={true}
        blurOnSubmit={true}
        ref={inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.grayDark,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  button: {
    paddingTop: 0,
  },
  input: {
    minWidth: 50,
    fontFamily: theme.fonts.default,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    color: theme.colors.white,
  },
  buttonTittle: {
    fontFamily: theme.fonts.default,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    color: theme.colors.green,
    textTransform: 'uppercase',
  },
  placeholder: {
    fontFamily: theme.fonts.default,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    color: theme.colors.textLightGray,
    textAlignVertical: 'center',
  },
});

export default InsertableTextArea;
