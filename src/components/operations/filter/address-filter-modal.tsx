import React, {useCallback, useEffect, useState} from 'react';
import FullScreenModal from '../../modal/full-screen-modal';
import {StyleSheet, View} from 'react-native';
import theme from '../../../theme';
import useTranslation from '../../../utils/use-translation';
import FullFilterAddressInput from './full-filter-address-input';

export interface AddressesFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (address?: string) => void;
  address?: string;
}
const AddressFilterModal = (props: AddressesFilterModalProps) => {
  const {onSubmit, address: initialAddress, visible} = props;

  const {t} = useTranslation();

  const [address, setAddress] = useState<string | undefined>(initialAddress);

  const submit = useCallback(() => {
    onSubmit(address);
  }, [address, onSubmit]);

  useEffect(() => {
    if (visible) {
      setAddress(initialAddress);
    }
  }, [initialAddress, visible]);

  return (
    <FullScreenModal
      visible={visible}
      onCancel={props.onCancel}
      title={t('Select addresses')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <View style={styles.container}>
        <FullFilterAddressInput address={address} onChange={setAddress} />
      </View>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default AddressFilterModal;
