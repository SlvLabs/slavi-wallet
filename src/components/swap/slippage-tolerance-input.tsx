import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import SimpleRadio from '../controls/simple-radio';
import theme from '../../theme';

export interface SlippageToleranceInputProps {
  value: number;
  onChange: (value: number) => void;
}
type RadioOption = 'custom' | 0.1 | 0.5 | 1 | 3;
export default function SlippageToleranceInput(props: SlippageToleranceInputProps) {
  const {value, onChange} = props;

  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const {t} = useTranslation();

  const options: {value: RadioOption; label: string}[] = useMemo(() => ([
      {value: 0.1, label: '0.1'},
      {value: 0.5, label: '0.5'},
      {value: 1, label: '1'},
      {value: 3, label: '3'},
      {value: 'custom', label: t('custom')},
  ]), [t]);

  const _onChange = useCallback((_value: RadioOption) => {
      if (_value === 'custom') {
        setShowCustomInput(true);
      } else {
        setShowCustomInput(false);
        onChange(+_value);
      }
  }, [onChange]);

  const onCustomInput = useCallback((_value: string) => {
      onChange(+_value);
  }, [onChange]);

  useEffect(() => {
    if (value && !options.find(v => value === v.value)) {
      setShowCustomInput(true);
    }
  }, [options, value]);

  return (
    <View style={styles.container}>
      <SimpleRadio
        options={options}
        selected={(showCustomInput ? 'custom' : value) as RadioOption}
        onChange={_onChange}
        elementStyle={styles.element}
      />
      {showCustomInput && (
        <View style={styles.inputWrap}>
          <Text style={styles.inputHelpText}>%</Text>
          <TextInput value={'' + value} onChangeText={onCustomInput} style={styles.input} keyboardType={'numeric'} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  element: {
    width: 'auto',
    minWidth: 40,
  },
  inputWrap: {
    marginTop: 12,
  },
  input: {
    backgroundColor: theme.colors.balanceHeaderBackground,
    borderRadius: 10,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    paddingRight: 18,
    paddingLeft: 18,
    height: 40,
  },
  inputHelpText: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 101,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.textLightGray,
  },
});
