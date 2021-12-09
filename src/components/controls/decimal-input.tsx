import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SimpleInput, {SimpleInputProps} from './simple-input';

export enum DecimalType {
  Integer,
  Real,
}

export interface DecimalInputProps extends SimpleInputProps {
  inputType: DecimalType;
}

const filter = (value?: string): string => {
  if (typeof value !== 'string') {
    return '';
  }
  let res: string = value.replace(' ', '');
  res = res.replace(',', '.');
  return res;
};

const validate = (re: RegExp, value?: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  if (value === '') {
    return true;
  }

  return re.test(value);
};

const realRegExp = /^([\d])+.?([\d])*$/;
const validateReal = (value?: string): boolean => validate(realRegExp, value);

const intRegExp = /^[\d]+$/;
const validateInteger = (value?: string): boolean => validate(intRegExp, value);

const DecimalInput = (props: DecimalInputProps) => {
  const {inputType, onChange: originalOnChange, ...otherProps} = props;
  const {t} = useTranslation();
  const [innerError, setInnerError] = useState<string>();

  const onChange = (value?: string) => {
    const filteredValue = filter(value);
    let isValid: boolean;

    setInnerError('');

    switch (inputType) {
      case DecimalType.Integer:
        isValid = validateInteger(filteredValue);
        break;
      case DecimalType.Real:
        isValid = validateReal(filteredValue);
        break;
      default:
        throw new Error('Unknown decimal type: ' + props.inputType);
    }

    if (isValid) {
      if (typeof originalOnChange !== 'undefined') {
        originalOnChange(filteredValue);
      }
    } else {
      setInnerError(t('Invalid numeric value'));
    }
  };

  return (
    <SimpleInput
      onChange={onChange}
      value={props.value}
      errorMessage={innerError || props.errorMessage}
      keyboardType={'numeric'}
      {...otherProps}
    />
  );
};

export default DecimalInput;
