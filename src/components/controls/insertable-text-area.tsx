import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TextStyle, View, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import {useTranslation} from 'react-i18next';

export interface CopiedTextAreaProps {
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  inputStyle?: TextStyle;
  lineNumber?: number;
}

export const DEFAULT_LINE_NUMBER = 5;

const InsertableTextArea = (props: CopiedTextAreaProps) => {
  const [value, setValue] = useState<string>('');

  const onPress = useCallback(async () => {
    Clipboard.getString().then((val: string) => setValue(val));
  }, []);

  const {t} = useTranslation();

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [props, value]);
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.buttonRow}>
        <Button
          title={t('Insert')}
          type="clear"
          style={{...styles.button, ...props.buttonStyle}}
          onPress={onPress}
        />
      </View>
      <TextInput
        style={{...styles.input, ...props.inputStyle}}
        numberOfLines={props.lineNumber || DEFAULT_LINE_NUMBER}
        value={value}
        onChangeText={setValue}
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
    borderColor: '#999',
    borderRadius: 6,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingTop: 0,
  },
  input: {
    minWidth: 50,
  },
});

export default InsertableTextArea;
