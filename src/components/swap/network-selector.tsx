import React, {useCallback, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import NetworkSelectModal from './network-select-modal';

interface NetworkData {
  id: string;
  name: string;
  logo?: string;
}

export type NetworksOptions = Record<string, NetworkData>;

export interface NetworkSelectorProps {
  networks: NetworksOptions;
  onSelect: (network: string) => void;
  value?: string;
}

export default function NetworkSelector(props: NetworkSelectorProps) {
  const {networks, value, onSelect} = props;

  const [modalIsShown, setModalIsShown] = useState<boolean>(false);

  const selected: NetworkData | undefined = useMemo(
    () => typeof value !== 'undefined' ? networks[value] : undefined,
    [networks, value]
  );

  const showModal = useCallback(() => setModalIsShown(true), []);
  const hideModal = useCallback(() => setModalIsShown(false), []);

  const _onSelect = useCallback((network: string) => {
    onSelect(network);
    hideModal();
  }, [onSelect, hideModal]);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={showModal}>
        <LinearGradient {...theme.gradients.button} style={styles.gradient}>
          <View style={styles.content}>
            <Image source={getImageSource(selected?.logo)} style={styles.image} />
            <Text style={styles.label}>{selected?.name}</Text>
            <CustomIcon name={'arrow'} size={18} color={theme.colors.textLightGray1} style={styles.icon} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <NetworkSelectModal onSelect={_onSelect} networks={networks} visible={modalIsShown} onCancel={hideModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  gradient: {
    borderRadius: 46,
    padding: 2,
  },
  content: {
    flexDirection: 'row',
    borderRadius: 44,
    backgroundColor: theme.colors.contentBackground,
    padding: 8,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  icon: {
    transform: [{
      rotate: '90deg',
    }],
    marginRight: 8,
  },
  label: {
    marginRight: 8,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.white,
    textAlignVertical: 'center',
  },
});
