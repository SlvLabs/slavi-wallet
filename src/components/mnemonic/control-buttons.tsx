import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import QrModal from '../modal/qr-modal';

export interface ControlButtonsProps {
  mnemonic: string;
  containerStyle?: ViewStyle;
}

const ControlButtons = (props: ControlButtonsProps) => {
  const {containerStyle, mnemonic} = props;

  const [qrShown, setQrShown] = useState<boolean>(false);

  const {t} = useTranslation();

  const showQr = useCallback(() => setQrShown(true), []);
  const hideQr = useCallback(() => setQrShown(false), []);

  const onPressCopy = useCallback(() => {
    Clipboard.setString(mnemonic);
    Toast.show(t('Copied in buffer'));
  }, [mnemonic, t]);

  return (
    <View style={[styles.container, containerStyle]}>
      <OutlineButton
        title={t('Copy')}
        onPress={onPressCopy}
        buttonStyle={styles.copyButton}
        titleStyle={styles.copyButtonTitle}
      />
      <OutlineButton
        title={t('Show QR')}
        onPress={showQr}
        buttonStyle={styles.qrButton}
        icon={<CustomIcon name={'scan'} size={16} color={theme.colors.white} style={{marginRight: 8}}/>}
      />
      <QrModal
        title={t('You Secret Phrase')}
        data={mnemonic}
        onCancel={hideQr}
        visible={qrShown}
        description={t('Copy or save this code. Never pass on to third parties it.')}
        showCloseIcon={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyButton: {
    borderColor: theme.colors.darkGreen1,
    width: 148,
    marginRight: 16,
  },
  copyButtonTitle: {
    color: theme.colors.borderGreen,
  },
  qrButton: {
    width: 148,
  },
});

export default ControlButtons;
