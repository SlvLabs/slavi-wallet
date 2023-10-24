import React from 'react';
import BaseAuthedModal from '../modal/base-authorized-modal';
import {NetworksOptions} from './network-selector';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import {ModalProps} from "../modal/base-modal";

export interface NetworkSelectModalProps extends ModalProps {
  networks: NetworksOptions;
  visible: boolean;
  onSelect: (id: string) => void;
  onCancel?: () => void;
}

export default function NetworkSelectModal(props: NetworkSelectModalProps) {
  const {networks, visible, onCancel, onSelect} = props;

  const {t} = useTranslation();

  return (
    <BaseAuthedModal
      visible={visible}
      onCancel={onCancel}
      showCloseIcon={false}
      modalStyle={styles.modal}
    >
      <View>
        <Text style={styles.header}>{t('selectNetwork')}</Text>
        {Object.entries(networks).map(([id, network]) => (
          <TouchableOpacity style={styles.networkElement} key={`net_option_${id}`} onPress={() => onSelect(id)}>
            <Image source={getImageSource(network.logo)} style={styles.image} />
            <Text style={styles.label}>{network.name}</Text>
          </TouchableOpacity>
        ))}
        </View>
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  networkElement: {
    paddingTop: 14,
    paddingBottom: 14,
    borderTopColor: theme.colors.borderGray,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  header: {
    marginLeft: 12,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.lightGray,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
