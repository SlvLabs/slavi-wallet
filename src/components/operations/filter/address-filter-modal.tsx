import React, {useEffect, useState} from 'react';
import FullScreenModal from '../../modal/full-screen-modal';
import {StyleSheet, View} from 'react-native';
import theme from '../../../theme';
import {useTranslation} from 'react-i18next';
import FullFilterAddressInput from './full-filter-address-input';

export interface AddressesFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (address?: string) => void;
  address?: string;
}
const AddressFilterModal = (props: AddressesFilterModalProps) => {
  const {onSubmit, address: initialAddress} = props;

  const {t} = useTranslation();

  const [address, setAddress] = useState<string | undefined>(initialAddress);

  const submit = () => {
    onSubmit(address);
  };

  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]);

  return (
    <FullScreenModal
      visible={props.visible}
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
