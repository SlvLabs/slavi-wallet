import React, {useCallback, useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment, {Moment} from 'moment';
// @ts-ignore - without types
import DateRangePicker from '@slavi/react-native-daterange-picker';
import theme from '../../../theme';
import {useTranslation} from 'react-i18next';

export interface FullFilterDateProps {
  onStartDateChange: (date: Moment | null) => void;
  onFinishDateChange: (date: Moment | null) => void;
  startDate: Moment | null;
  finishDate: Moment | null;
  onClose: () => void;
  visible?: boolean;
}

const FullFilterDate = (props: FullFilterDateProps) => {
  const {
    startDate: initialStartDate,
    finishDate: initialFinishDate,
    onStartDateChange,
    onFinishDateChange,
    onClose,
  } = props;

  const {t} = useTranslation();

  const [startDate, setStartDate] = useState<Moment | null>(initialStartDate);
  const [finishDate, setFinishDate] =
    useState<Moment | null>(initialFinishDate);
  const [displayedDate, setDisplayedDate] = useState<Moment>(moment());

  const onChange = useCallback(dates => {
    if (typeof dates.startDate !== 'undefined') {
      setStartDate(dates.startDate);
    }

    if (dates.endDate) {
      setFinishDate(dates.endDate);
    }

    if (typeof dates.displayedDate !== 'undefined') {
      setDisplayedDate(dates.displayedDate);
    }
  }, []);

  const onClear = useCallback(() => {
    setStartDate(null);
    setFinishDate(null);
    setDisplayedDate(moment());
  }, []);

  const onSubmit = useCallback(() => {
    onStartDateChange(startDate);
    onFinishDateChange(finishDate);
    onClose();
  }, [finishDate, onClose, onFinishDateChange, onStartDateChange, startDate]);

  const controlButtons = useMemo(
    () => (
      <View style={styles.buttonsContainer}>
        <View style={styles.leftColumn}>
          <TouchableOpacity style={styles.button} onPress={onClear}>
            <Text style={styles.buttonText}>{t('Clear')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>{t('Cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, ...styles.buttonOk}}
            onPress={onSubmit}>
            <Text style={styles.buttonText}>{t('Ok')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [onClear, onClose, onSubmit, t],
  );

  return (
    <Modal visible={!!props.visible}>
      <DateRangePicker
        open={props.visible}
        endDate={finishDate}
        startDate={startDate}
        onChange={onChange}
        displayedDate={displayedDate}
        range={true}
        buttons={true}
        controlButtons={controlButtons}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: theme.colorsOld.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 28,
    flex: 1,
  },
  leftColumn: {
    flexDirection: 'row',
  },
  rightColumn: {
    flexDirection: 'row',
  },
  button: {},
  buttonOk: {
    marginLeft: 16,
  },
  buttonText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 14,
    lineHeight: 14,
  },
});

export default FullFilterDate;
