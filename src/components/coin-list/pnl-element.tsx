import React from 'react';
import ElementWithChevron, {ChevronType} from './element-with-chevron';
import {TextStyle, ViewStyle} from 'react-native';

export interface PnlElementProps {
  value: string;
  ticker: string;
  valueStyle?: TextStyle;
  changeStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const PnlElement = (props: PnlElementProps) => {
  let type;
  const castedValue = +props.value;
  if (castedValue > 0) {
    type = ChevronType.positive;
  } else if (castedValue < 0) {
    type = ChevronType.negative;
  } else {
    type = ChevronType.zero;
  }

  return (
    <ElementWithChevron
      value={props.value}
      label={props.ticker}
      type={type}
      valueStyle={props.valueStyle}
      changeStyle={props.changeStyle}
      containerStyle={props.containerStyle}
    />
  );
};

export default PnlElement;
