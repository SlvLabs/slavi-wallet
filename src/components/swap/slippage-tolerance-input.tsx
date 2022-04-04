import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import SimpleRadio from '../controls/simple-radio';
import theme from '../../theme';

export interface SlippageToleranceInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SlippageToleranceInput(props: SlippageToleranceInputProps) {
  const {value, onChange} = props;

  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const {t} = useTranslation();

  const options = useMemo(() => ({
    'custom': t('custom'),
    '3': '3',
    '1': '1',
    '0.5': '0.5',
    '0.1': '0.1',
  }), [t]);

  const _onChange = useCallback((value: string) => {
    if(value === 'custom') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onChange(+value);
    }
  }, [onChange]);

  const onCustomInput = useCallback((value: string) => {
    onChange(+value);
  }, [onChange]);

  useEffect(() => {
    if(value && !Object.keys(options).includes('' + value)) {
      setShowCustomInput(true);
    }
  }, [value]);

  return (
      <View style={styles.container}>
        <SimpleRadio
          options={options}
          selected={showCustomInput ? 'custom' : value as unknown as string}
          onChange={_onChange}
          elementStyle={styles.element}
        />
        {showCustomInput && (
          <TextInput
            value={''+value}
            onChangeText={onCustomInput}
            style={styles.input}
            keyboardType={'numeric'}
          />
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  element: {
    width: 'auto',
    minWidth: 40,
  },
  input: {
    backgroundColor: theme.colors.balanceHeaderBackground,
    borderRadius: 10,
    marginTop: 12,
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
});
