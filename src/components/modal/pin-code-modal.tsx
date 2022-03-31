import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FullScreenModal from './full-screen-modal';
import useTranslation from '../../utils/use-translation';
import PinInput from '../controls/pin-input';
import theme from '../../theme';

export interface PinCodeModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: (pin: string) => void;
}

const PIN_LENGTH = 4;

export default function PinCodeModal(props: PinCodeModalProps) {
  const {visible, onCancel, onSuccess} = props;

  const [firstPin, setFirstPin] = useState<string>();
  const [secondPin, setSecondPin] = useState<string>();
  const [currentPin, setCurrentPin] = useState<string>();
  const [error, setError] = useState<string>();

  const {t} = useTranslation();

  const onBackspace = () => setCurrentPin(currentPin?.slice(0, -1));
  const onPress = (num: number) => setCurrentPin(!currentPin ? `${num}` : `${currentPin}${num}`);

  useEffect(() => {
    if(firstPin && secondPin) {
      if(firstPin === secondPin) {
        onSuccess(firstPin);
      } else {
        setError(t('pinUnequal'));
        setFirstPin(undefined);
        setCurrentPin(undefined);
        setSecondPin(undefined);
      }
    }
  }, [firstPin, secondPin, onSuccess]);

  useEffect(() => {
    if(currentPin?.length === PIN_LENGTH) {
      if(!firstPin) {
        setFirstPin(currentPin);
      } else {
        setSecondPin(currentPin);
      }
      setCurrentPin(undefined);
    }
  }, [currentPin]);

  useEffect(() => {
    if(error && currentPin) {
      setError(undefined);
    }
  }, [currentPin]);

  useEffect(() => {
    setError(undefined);
    setCurrentPin(undefined);
    setSecondPin(undefined);
    setFirstPin(undefined);
  }, [visible])

  return (
    <FullScreenModal
      visible={visible}
      onCancel={onCancel}
      >
      <View style={styles.content}>
        <PinInput
          length={PIN_LENGTH}
          enteredCount={currentPin?.length || 0}
          onPress={onPress}
          onBackspacePress={onBackspace}
          label={firstPin ? t('repeatPin') : t('pinLabel')}
        />
        <Text style={styles.error}>{error}</Text>
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  content: {},
  error: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.errorRed,
    marginTop: 20,
  },
});
