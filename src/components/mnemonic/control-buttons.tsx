import React, {useCallback} from 'react';
import {Button, StyleSheet, View, ViewStyle} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';

export interface ControlButtonsProps {
  mnemonic: string;
  containerStyle?: ViewStyle;
  buttonsCopyColor?: string;
  buttonsQRColor?: string;
}

const ControlButtons = (props: ControlButtonsProps) => {
  const {containerStyle, buttonsCopyColor, buttonsQRColor, mnemonic} = props;

  const {t} = useTranslation();

  const onPressCopy = useCallback(() => {
    Clipboard.setString(mnemonic);
    Toast.show(t('Copied in buffer'));
  }, [mnemonic, t]);
  const onPressQR = useCallback(() => Toast.show('Coming soon'), []);

  return (
    <View style={[styles.container, containerStyle]}>
      <Button
        title={t('Copy')}
        color={buttonsCopyColor}
        onPress={onPressCopy}
      />
      <Button title={t('Show QR')} color={buttonsQRColor} onPress={onPressQR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ControlButtons;
