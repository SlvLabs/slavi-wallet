import React, {useMemo, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import {ButtonGroup} from '../controls/button-group';

export interface ChartButtonsRowProps {
  onTimeButtonClick: (start: number, end: number) => void;
  onCurrencyButtonClick: (currency: string) => void;
  disabled: boolean;
  currencyFirst: string;
  currencySecond: string | null;
  containerStyle?: ViewStyle;
}

const dayMilliseconds = 1000 * 60 * 60 * 24;
const weekMilliseconds = 7 * dayMilliseconds;
const monthMilliseconds = 31 * dayMilliseconds;
const yearMilliseconds = 365 * dayMilliseconds;

const ChartButtonsRow = (props: ChartButtonsRowProps) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<number>(4);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(0);

  const {t} = useTranslation();
  const timeButtons = useMemo(() => [t('D'), t('W'), t('M'), t('Y'), t('All')], [t]);

  const timeToSubset = [dayMilliseconds, weekMilliseconds, monthMilliseconds, yearMilliseconds, Date.now()];

  const currencyArray = useMemo(
    () => (props.currencySecond ? [props.currencyFirst, props.currencySecond] : [props.currencyFirst]),
    [props.currencySecond, props.currencyFirst],
  );

  const onClick = (index: number) => {
    let end = Date.now();
    props.onTimeButtonClick(end - timeToSubset[index], end);
    setSelectedTimePeriod(index);
  };

  const onCurrencyButtonClick = (index: number) => {
    props.onCurrencyButtonClick(currencyArray[index]);
    setSelectedCurrency(index);
  };

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <ButtonGroup options={timeButtons} onPress={onClick} selected={selectedTimePeriod} />
      <ButtonGroup options={currencyArray} onPress={onCurrencyButtonClick} selected={selectedCurrency} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ChartButtonsRow;
