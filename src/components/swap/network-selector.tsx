import React, {useCallback, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import NetworkSelectModal from './network-select-modal';

export interface NetworkData {
  id: string;
  name: string;
  logo?: string;
}

export type NetworksOptions = Record<string, NetworkData>;

export interface NetworkSelectorProps {
  networks: NetworksOptions;
  onSelect: (network: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
  label: string;
}

export default function NetworkSelector(props: NetworkSelectorProps) {
  const {networks, value, onSelect, containerStyle, label} = props;

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
    <TouchableOpacity style={{...styles.container, ...containerStyle}} onPress={showModal}>
      <View style={styles.content}>
        <Image source={getImageSource(selected?.logo)} style={styles.image} />
        <View style={styles.textBlock}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{selected?.name}</Text>
        </View>
      </View>
      <CustomIcon name={'arrow'} size={18} color={theme.colors.textLightGray1} style={styles.icon} />
      <NetworkSelectModal onSelect={_onSelect} networks={networks} visible={modalIsShown} onCancel={hideModal} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.grayDark,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 18,
      paddingBottom: 18,
      flexDirection: 'row',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.borderGray,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gradient: {
      borderRadius: 46,
      padding: 2,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
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
    value: {
      marginRight: 8,
      fontFamily: theme.fonts.default,
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 22,
      color: theme.colors.white,
      textAlignVertical: 'center',
    },
    label: {
      marginRight: 8,
      fontFamily: theme.fonts.default,
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 14,
      color: theme.colors.lightGray,
      textAlignVertical: 'center',
    },
    textBlock: {},
});
