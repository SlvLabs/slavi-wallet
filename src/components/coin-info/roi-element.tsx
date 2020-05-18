import React from 'react';
import {Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

export interface RoiElementProps {
  roi: number;
  containerStyle?: ViewStyle;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const RoiElement = (props: RoiElementProps) => {
  const {t} = useTranslation();
  return (
    <LinearGradient
      {...theme.gradientsOld.default}
      style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.value, ...props.valueStyle}}>
        {props.roi || 0}%
      </Text>
      <Text style={{...styles.label, ...props.labelStyle}}>{t('ROI')}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 8,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: theme.colorsOld.white,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: theme.colorsOld.white,
    marginLeft: 5,
  },
});

export default RoiElement;
