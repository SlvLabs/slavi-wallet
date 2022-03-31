import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import NetworkSelector, {NetworksOptions} from './network-selector';
import useTranslation from '../../utils/use-translation';
import SettingsModal from './settings-modal';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import {useNavigation} from '@react-navigation/native';

export interface ExchangeHeaderProps {
  onNetworkChange: (network: string) => void;
  networks: NetworksOptions;
  txPriority: TransactionPriority;
  onTxPriorityChange: (priority: TransactionPriority) => void;
  slippageTolerance: number;
  onSlippageToleranceChange: (value: number) => void;
  selectedNetwork?: string;
}

export default function ExchangeHeader(props: ExchangeHeaderProps) {
  const {
    networks,
    onNetworkChange,
    selectedNetwork,
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
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
        <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
      </TouchableOpacity>
      <Text style={styles.header}>{t('exchange')}</Text>
      <View style={styles.controls}>
        <NetworkSelector value={selectedNetwork} networks={networks} onSelect={onNetworkChange} />
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
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 18,
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 18,
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
