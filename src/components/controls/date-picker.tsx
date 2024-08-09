import {View, Text, TouchableOpacity, StyleSheet, ViewStyle, Platform} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../theme';

export interface DatePickerProps {
  value: Date | undefined;
  onChange: (date?: Date) => void;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

const DatePicker = (props: DatePickerProps) => {
  const [pickerIsVisible, setPickerIsVisible] = useState<boolean>(false);
  const show = useCallback(() => setPickerIsVisible(true), []);
  const hide = useCallback(() => setPickerIsVisible(false), []);

  const onChange = useCallback(
    (_event: unknown, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || props.value;
      if (Platform.OS !== 'ios') {
        hide();
      }
      props.onChange(currentDate);
    },
    [hide, props],
  );

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <TouchableOpacity onPress={show} style={{...styles.content, ...props.contentStyle}}>
        <Icon type={'feather'} name={'calendar'} />
        <View>{props.value && <Text>{props.value.toLocaleDateString()}</Text>}</View>
      </TouchableOpacity>
      {pickerIsVisible && (
        <View>
          {Platform.OS === 'ios' && (
            <View>
              <TouchableOpacity onPress={hide}>
                <Text>{'ok'}</Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            testID="dateTimePicker"
            value={props.value || new Date()}
            mode={'date'}
            display="default"
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: theme.colorsOld.border.primary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
});

export default DatePicker;
