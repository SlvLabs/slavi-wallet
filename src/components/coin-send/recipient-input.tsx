import React, {useMemo} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import SimpleInput from '../controls/simple-input';
import CustomIcon from '../custom-icon/custom-icon';
import Layout from '../../utils/layout';

export interface RecipientInputProps {
  onChange: (val: string) => void;
  label?: string;
  onPressQr?: () => void;
  value?: string;
  errors?: string[];
  containerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
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
        onChange={props.onChange}
        value={props.value}
        buttonText={t('Paste')}
        icon={
          <CustomIcon
            name={'scan'}
            size={Layout.isSmallDevice ? 20 : 24}
            color={theme.colors.textLightGray3}
          />
        }
        onButtonPress={onPastePress}
        onIconPress={props.onPressQr}
        errorMessage={errorMessage}
        label={props.label}
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
});

export default RecipientInput;
