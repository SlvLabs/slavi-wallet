import React, {useCallback, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import {SelectModal} from '../modal/select-modal';

export type SelectOptions = Record<string, string>;

export interface SimpleSelectProps {
  onSelect: (value: string) => void;
  options?: SelectOptions;
  value?: string;
  placeholder?: string;
  label?: string;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const defaultIconSize = 16;
const defaultIconColor = theme.colors.lightGray;

export default function SimpleSelect(props: SimpleSelectProps) {
  const {options, value, label, isLoading, onSelect} = props;

  const {t} = useTranslation();

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const showModal = useCallback(() => setModalIsVisible(true), []);
  const hideModal = useCallback(() => setModalIsVisible(false), []);

  return (
    <TouchableOpacity
      style={{...styles.container, ...props.containerStyle}}
      onPress={showModal}>
      <View style={styles.leftInputColumn}>
        {!!label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        {
          isLoading ?
            <ActivityIndicator /> :
            <Text style={styles.text}>
              {options && value && options[value]  ? options[value] : t('Please select...')}
            </Text>
        }
      </View>
      <View style={styles.rightInputColumn}>
        <Icon
          name={'down'}
          type={'antdesign'}
          size={props.iconSize || defaultIconSize}
          color={props.iconColor || defaultIconColor}
        />
      </View>
      {!isLoading && !!options &&
      <SelectModal
        options={options}
        visible={modalIsVisible}
        onCancel={hideModal}
        header={label}
        current={value}
        onSelect={onSelect}
      />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.grayDark,
    marginBottom: 24,
    flexDirection: 'row',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray1,
  },
  labelContainer: {
    marginBottom: 8,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
  },
  rightInputColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftInputColumn: {
    flex: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});
