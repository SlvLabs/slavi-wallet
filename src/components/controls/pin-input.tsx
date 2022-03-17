import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import CustomIcon from '../custom-icon/custom-icon';

export interface PinInputProps {
  length: number;
  enteredCount: number;
  onPress: (num: number) => void;
  onBackspacePress: () => void;
  label?: string;
  faceIdIsAvailable?: boolean;
  touchIdIsAvailable?: boolean;
  restoreIsAvailable?: boolean;
  onRestorePress?: () => void;
  onBiometricPress?: () => void;
  disabled?: boolean;
}

const NUMBERS = [1,2,3,4,5,6,7,8,9];

export default function PinInput(props: PinInputProps) {
  const {
    length,
    enteredCount,
    label,
    onPress,
    faceIdIsAvailable,
    touchIdIsAvailable,
    onBackspacePress,
    onBiometricPress,
    restoreIsAvailable,
    onRestorePress,
    disabled,
  } = props;

  const {t} = useTranslation();

  const biometricIcon = useMemo(() => {
    if(enteredCount > 0) {
      return <CustomIcon
        name={'backspace'}
        size={36}
        color={theme.colors.white}
        onPress={() => {
          if(!disabled) {
            onBackspacePress();
          }
        }}
      />
    }

    if(faceIdIsAvailable) {
      return <CustomIcon
        name={'scan-outline'}
        size={36}
        color={theme.colors.white}
        onPress={ () => {
          if(!disabled) {
            onBiometricPress?.();
          }
        }}
      />
    }

    if(touchIdIsAvailable) {
      return <CustomIcon
        name={'finger-print-outline'}
        size={36}
        color={theme.colors.white}
        onPress={ () => {
          if(!disabled) {
            onBiometricPress?.();
          }
        }}
      />
    }

    return undefined;
  }, [enteredCount, faceIdIsAvailable, touchIdIsAvailable, disabled]);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.indicatorContainer}>
        {[...Array(length)].map((_, index) => <View style={{...styles.point, ...(index < enteredCount ? styles.activePoint : styles.inactivePoint)}} key={`pin_indicator_${index}`}/>)}
      </View>
      <View style={styles.keyboardContainer}>
        {NUMBERS.map(number => (
          <TouchableOpacity
            key={`number_${number}`}
            style={styles.numberButton}
            onPress={() => onPress(number)}
            disabled={disabled}
          >
            <Text style={disabled ? styles.disabledText : styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.lastRowContainer}>
        <TouchableOpacity
          style={styles.restoreButton}
          disabled={!restoreIsAvailable}
          onPress={onRestorePress}
        >
          {restoreIsAvailable && <Text style={styles.restoreLabel}>{t('restoreLabel')}</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => onPress(0)}
          disabled={disabled}
        >
          <Text style={disabled ? styles.disabledText : styles.numberText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.biometricButton} disabled={disabled}>
          {!!biometricIcon && biometricIcon}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.white,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  inactivePoint: {
    backgroundColor: theme.colors.inactiveGray,
  },
  activePoint: {
    backgroundColor: theme.colors.green,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 64,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 45,
    backgroundColor: theme.colors.opacityButton,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontFamily: theme.fonts.default,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 35,
    color: theme.colors.white,
    textAlign: 'center',
  },
  disabledText: {
    fontFamily: theme.fonts.default,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 35,
    color: theme.colors.textLightGray1,
    textAlign: 'center',
  },
  lastRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  restoreButton: {
    width: 70,
    height: 70,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricButton: {
    width: 70,
    height: 70,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restoreLabel: {
    fontFamily: theme.fonts.default,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.white,
    textAlign: 'center',
  },
});
