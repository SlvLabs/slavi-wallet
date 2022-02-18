import React, {useMemo, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import {ButtonGroup} from 'react-native-elements';
import theme from '../../theme';

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
  const timeButtons = useMemo(() =>[t('D'), t('W'), t('M'), t('Y'), t('All')], [t]);

  const timeToSubset = [
    dayMilliseconds,
    weekMilliseconds,
    monthMilliseconds,
    yearMilliseconds,
    Date.now(),
  ];

  const currencyArray = useMemo(
    () => props.currencySecond ? [props.currencyFirst, props.currencySecond] : [props.currencyFirst],
    [props.currencySecond, props.currencyFirst]
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
      <ButtonGroup
        buttons={timeButtons}
        onPress={onClick}
        containerStyle={styles.timeButtons}
        buttonStyle={styles.button}
        buttonContainerStyle={styles.buttonContainer}
        selectedButtonStyle={styles.selectedButton}
        selectedIndex={selectedTimePeriod}
        disabled={timeButtons.length === 1}
        disabledSelectedStyle={styles.selectedButton}
        disabledSelectedTextStyle={styles.buttonText}
        textStyle={styles.buttonText}
        selectedTextStyle={styles.buttonText}
        innerBorderStyle={styles.innerBorder}
      />
      <View style={styles.stubInRow} />
      <ButtonGroup
        buttons={currencyArray}
        containerStyle={styles.currencyButtons}
        onPress={onCurrencyButtonClick}
        buttonStyle={styles.button}
        buttonContainerStyle={styles.buttonContainer}
        selectedButtonStyle={styles.selectedButton}
        selectedIndex={selectedCurrency}
        disabled={currencyArray.length === 1}
        disabledSelectedStyle={styles.selectedButton}
        disabledSelectedTextStyle={styles.buttonText}
        textStyle={styles.buttonText}
        selectedTextStyle={styles.buttonText}
        innerBorderStyle={styles.innerBorder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 8,
  },
  timeButtons: {
    flex: 5,
    alignSelf: 'flex-start',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  currencyButtons: {
    flex: 4,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    borderWidth: 0,
  },
  stubInRow: {
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.cardBackground2,
  },
  buttonContainer: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: theme.colors.green,
  },
  buttonText: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    color: theme.colors.white,
  },
  innerBorder: {
    width: 0,
  }
});

export default ChartButtonsRow;
