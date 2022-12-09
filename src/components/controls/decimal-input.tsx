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
  allowNegative?: boolean;
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

const createValidator = (regexp: RegExp) => (value?: string) => validate(regexp, value);

const {validateInteger, validateReal, validateIntegerPositive, validateRealPositive} = {
  validateReal: createValidator(/^-?\d+(\.\d*)?$/),
  validateRealPositive: createValidator(/^\d+(\.\d*)?$/),
  validateInteger: createValidator(/^-?[\d]+$/),
  validateIntegerPositive: createValidator(/^[\d]+$/),
};

const selectValidator = (type: DecimalType, allowNegative = false) => {
  if (type === DecimalType.Real) {
    if (allowNegative) {
      return validateReal;
    } else {
      return validateRealPositive;
    }
  } else if (type === DecimalType.Integer) {
    if (allowNegative) {
      return validateInteger;
    } else {
      return validateIntegerPositive;
    }
  }
};

const toPrecision = (source: string, precision: number): string => {
  const regExp = new RegExp(`^(\\d+(\\.\\d{0,${precision}})?)(.*)$`);
  return regExp.exec(source)?.[1] || '';
};

const DecimalInput = (props: DecimalInputProps) => {
  const {inputType, onChange: originalOnChange, value, allowNegative, maximumPrecision, ...otherProps} = props;
  const {t} = useTranslation();
  const [innerError, setInnerError] = useState<string>();
  const validator = selectValidator(inputType, allowNegative);
  if (!validator) {
    throw new Error('Unknown decimal type: ' + props.inputType);
  }

  const onChange = useCallback(
    (_value?: string) => {
      let filteredValue = filter(_value);
      let isValid: boolean;

      setInnerError('');
      isValid = validator(filteredValue);
      if (isValid) {
        if (inputType === DecimalType.Real && maximumPrecision) {
          filteredValue = toPrecision(filteredValue, maximumPrecision);
        }

        if (originalOnChange) {
          originalOnChange(filteredValue);
        }
      } else {
        setInnerError(t('Invalid numeric value'));
      }
    },
    [inputType, maximumPrecision, originalOnChange, t, validator],
  );

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
