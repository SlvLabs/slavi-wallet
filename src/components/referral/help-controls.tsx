import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import React, {useCallback} from 'react';
import SimpleToast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';

export function HelpControls() {
  const {t} = useTranslation();

  const onPress = useCallback(async () => {
    const url = t('referralHelpPageUrl');
    if (url && (await Linking.canOpenURL(url))) {
      await Linking.openURL(url);
    } else {
      SimpleToast.show(t('Can not open link'));
    }
  }, [t]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CustomIcon name={'InfoCircle'} size={24} color={theme.colors.textLightGray3} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    marginLeft: -32,
  },
});
