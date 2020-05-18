import React, {useMemo} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';
import SimpleInput from '../controls/simple-input';

export interface RecipientInputProps {
  onChange: (val: string) => void;
  label?: string;
  onPressQr?: () => void;
  value?: string;
  errors?: string[];
  containerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  contentStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  rightControlsStyle?: ViewStyle;
  leftControlsStyle?: ViewStyle;
}

const RecipientInput = (props: RecipientInputProps) => {
  const {t} = useTranslation();

  const onPastePress = async () => {
    Clipboard.getString().then((val: string) => props.onChange(val));
  };

  const errorMessage = useMemo(
    () =>
      props.errors?.reduce((acc: string, cur: string) => acc + cur + ' ', ''),
    [props.errors],
  );

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <SimpleInput
        placeholder={props.label}
        onChange={props.onChange}
        value={props.value}
        buttonText={t('Paste')}
        icon={
          <Icon
            name={'qrcode'}
            type={'font-awesome'}
            size={24}
            color={theme.colorsOld.lightGray}
          />
        }
        onButtonPress={onPastePress}
        onIconPress={props.onPressQr}
        errorMessage={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  labelContainer: {},
  label: {},
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 8,
  },
  rightControlsView: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  input: {},
  pasteButton: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.1,
    color: theme.colorsOld.blue,
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: theme.colorsOld.cultured,
  },
});

export default RecipientInput;
