import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ButtonGroup} from 'react-native-elements';

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
  const {t} = useTranslation();
  const timeButtons = [t('D'), t('W'), t('M'), t('Y'), t('All')];
  const timeToSubset = [
    dayMilliseconds,
    weekMilliseconds,
    monthMilliseconds,
    yearMilliseconds,
    Date.now(),
  ];
  const currencyArray = props.currencySecond
    ? [props.currencyFirst, props.currencySecond]
    : [props.currencyFirst];
  const onClick = (index: number) => {
    let end = Date.now();
    props.onTimeButtonClick(end - timeToSubset[index], end);
  };
  const onCurrencyButtonClick = (index: number) => {
    props.onCurrencyButtonClick(currencyArray[index]);
  };
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <ButtonGroup
        buttons={timeButtons}
        onPress={onClick}
        containerStyle={styles.timeButtons}
      />
      <View style={styles.stubInRow} />
      <ButtonGroup
        buttons={currencyArray}
        containerStyle={styles.currencyButtons}
        onPress={onCurrencyButtonClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 8,
  },
  timeButtons: {
    flex: 5,
    alignSelf: 'flex-start',
  },
  currencyButtons: {
    flex: 4,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  stubInRow: {
    flex: 1,
  },
});

export default ChartButtonsRow;
