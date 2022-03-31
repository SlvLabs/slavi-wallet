import React, {useCallback, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import SimpleInput, {SimpleInputProps} from './simple-input';

export enum DecimalType {
  Integer,
  Real,
}

export interface DecimalInputProps extends SimpleInputProps {
  inputType: DecimalType;
  maximumPrecision?: number;
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


const toPrecision = (source: string, precision: number): string => {
  const regExp = new RegExp(`^(\\d+(\\.\\d{0,${precision}})?)(.*)$`);
  return regExp.exec(source)?.[1] || '';
}

const DecimalInput = (props: DecimalInputProps) => {
  const {inputType, onChange: originalOnChange, value, maximumPrecision, ...otherProps} = props;
  const {t} = useTranslation();
  const [innerError, setInnerError] = useState<string>();

  const onChange = useCallback((value?: string) => {
    let filteredValue = filter(value);
    let isValid: boolean;

    setInnerError('');

    console.log(inputType);
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
      if(inputType === DecimalType.Real && maximumPrecision) {
        filteredValue = toPrecision(filteredValue, maximumPrecision);
      }

      if (typeof originalOnChange !== 'undefined') {
        originalOnChange(filteredValue);
      }
    } else {
      setInnerError(t('Invalid numeric value'));
    }
  }, [originalOnChange]);

  return (
    <SimpleInput
      onChange={onChange}
      value={value}
      errorMessage={innerError || props.errorMessage}
      keyboardType={'numeric'}
      returnKeyType={'done'}
      {...otherProps}
    />
  );
};

export default DecimalInput;
