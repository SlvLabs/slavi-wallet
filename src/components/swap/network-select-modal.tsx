import React from 'react';
import BaseModal, {ModalProps} from '../modal/base-modal';
import {NetworksOptions} from './network-selector';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';

export interface NetworkSelectModalProps extends ModalProps {
  networks: NetworksOptions;
  visible: boolean;
  onSelect: (id: string) => void;
  onCancel?: () => void;
}

export default function NetworkSelectModal(props: NetworkSelectModalProps) {
  const {networks, visible, onCancel, onSelect} = props;

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      showCloseIcon={false}
      modalStyle={styles.modal}
    >
      {Object.entries(networks).map(([id, network]) => (
        <TouchableOpacity style={styles.networkElement} key={`net_option_${id}`} onPress={() => onSelect(id)}>
          <Image source={getImageSource(network.logo)} style={styles.image} />
          <Text style={styles.label}>{network.name}</Text>
        </TouchableOpacity>
      ))}
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  networkElement: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: theme.colors.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  image: {
    width: 24,
    height: 24,
  },
  label: {
    marginLeft: 12,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: theme.colors.white,
  },
  modal: {
    backgroundColor: theme.colors.contentBackground,
    width: 200,
  }
});
