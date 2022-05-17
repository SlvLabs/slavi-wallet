import React, {useCallback, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import SettingsModal from './settings-modal';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../utils/layout';

export interface ExchangeHeaderProps {
  txPriority: TransactionPriority;
  onTxPriorityChange: (priority: TransactionPriority) => void;
  slippageTolerance: number;
  onSlippageToleranceChange: (value: number) => void;
}

export default function ExchangeHeader(props: ExchangeHeaderProps) {
  const {
    txPriority,
    onTxPriorityChange,
    slippageTolerance,
    onSlippageToleranceChange
  } = props;

  const [settingsIsShown, setSettingsIsShown] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const showSettings = useCallback(() => setSettingsIsShown(true), []);
  const hideSettings = useCallback(() => setSettingsIsShown(false), []);

  const onSettingsChange = useCallback((speed: TransactionPriority, value: number) => {
    onSlippageToleranceChange(value);
    onTxPriorityChange(speed);
    hideSettings();
  }, [onSlippageToleranceChange, onTxPriorityChange, hideSettings]);

  const onBackPress = useCallback(() => {
    if(navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
        <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
      </TouchableOpacity>
      <Text style={styles.header}>{t('exchange')}</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={showSettings}>
          <CustomIcon name={'settings-outline'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      </View>
      <SettingsModal
        speed={txPriority}
        slippageTolerance={slippageTolerance}
        visible={settingsIsShown}
        onCancel={hideSettings}
        onAccept={onSettingsChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
    marginBottom: 18,
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: Layout.isSmallDevice ? 14 : 18,
    lineHeight: 28,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    transform: [{
      rotate: '180deg',
    }],
  },
});
