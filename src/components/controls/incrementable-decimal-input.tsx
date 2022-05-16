import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import DecimalInput, {DecimalType} from './decimal-input';
import theme from '../../theme';
import {Decimal80} from '@slavi/wallet-core/src/utils/prepared-decimal';

export interface IncrementableDecimalInputProps {
  onValueChange: (v: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
  maxValue?: string;
  minValue?: string;
}

export default function IncrementableDecimalInput(props: IncrementableDecimalInputProps) {
  const {containerStyle, value, onValueChange, maxValue, minValue} = props;

  const incDisabled = useMemo(() =>
      maxValue && (new Decimal80(value || 0).greaterThanOrEqualTo((new Decimal80(maxValue)))),
    [value, maxValue]
  );

  const decDisabled = useMemo(() =>
      minValue && (new Decimal80(value || 0).lessThanOrEqualTo((new Decimal80(minValue)))),
    [value, minValue]
  );

  const onPlusPress = useCallback(() => {
      if (incDisabled) {
        return;
      }

      onValueChange((new Decimal80(value || 0).add(1).toString()))
    },
    [value, onValueChange, incDisabled]
  );

  const onMinusPress = useCallback(() => {
      if (decDisabled) {
        return;
      }
      onValueChange((new Decimal80(value || 0).sub(1).toString()))
    },
    [value, onValueChange, decDisabled]
  );

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <CustomIcon
        name={'minus'}
        size={24}
        color={incDisabled ? theme.colors.inactiveGray : theme.colors.textLightGray3}
        onPress={onMinusPress}
      />
      <DecimalInput
        inputType={DecimalType.Integer}
        containerStyle={styles.input}
        onChange={onValueChange}
        value={value}
      />
      <CustomIcon
        name={'plus'}
        size={24}
        color={incDisabled ? theme.colors.inactiveGray : theme.colors.green}
        onPress={onPlusPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 17,
    paddingRight: 17,
  },
  input: {
    width: '80%',
  },
});
