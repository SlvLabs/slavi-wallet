import React, {useCallback, useState} from 'react';
import FullFilterSection from './full-filter-section';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import FullFilterDate from './full-filter-date';
import {Moment} from 'moment';
import CustomIcon from '../../custom-icon/custom-icon';
import theme from '../../../theme';

export interface FullFilterDateSectionProps {
  startDate: Moment | null;
  finishDate: Moment | null;
  onStartDateChange: (date: Moment | null) => void;
  onFinishDateChange: (date: Moment | null) => void;
}

const DATE_FORMAT = 'MMMM DD YYYY';

const FullFilterDateSection = (props: FullFilterDateSectionProps) => {
  const {t} = useTranslation();

  const [datePickerShown, setDatePickerShown] = useState<boolean>(false);

  const showDatePicker = useCallback(() => setDatePickerShown(true), []);
  const hideDatePicker = useCallback(() => setDatePickerShown(false), []);

  const datesStr =
    props.startDate && props.finishDate
      ? `${props.startDate.format(DATE_FORMAT)} - ${props.finishDate.format(
          DATE_FORMAT,
        )}`
      : t('Select date range...');

  return (
    <FullFilterSection title={t('Date')}>
      <FullFilterDate
        onStartDateChange={props.onStartDateChange}
        onFinishDateChange={props.onFinishDateChange}
        startDate={props.startDate}
        finishDate={props.finishDate}
        visible={datePickerShown}
        onClose={hideDatePicker}
      />
      <TouchableOpacity style={styles.container} onPress={showDatePicker}>
        <Text style={styles.text}>{datesStr}</Text>
        <CustomIcon name={'calendar'} size={24} color={theme.colors.textLightGray3} />
      </TouchableOpacity>
    </FullFilterSection>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.maxDarkBackground,
    padding: 16,
    borderRadius: 16,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.textLightGray3,
  },
});

export default FullFilterDateSection;
