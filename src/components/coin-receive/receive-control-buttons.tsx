import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';
import shareAsImage from '../../utils/share-as-image';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import SimpleInputModal from '../modal/simple-input-modal';

export interface ReceiveControlButtonsProps {
  address: string;
  editAddress: (value?: string) => void;
  editAmount: (value?: string) => void;
  dataToShare?: string | null;
  containerStyle?: ViewStyle;
  iconsSize?: number;
  iconsColor?: string;
  addressName?: string;
}

const defaultIconSize = 32;
const defaultIconColor = theme.colors.gold2;

const ReceiveControlButtons = (props: ReceiveControlButtonsProps) => {
  const {t} = useTranslation();

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [amountModalVisible, setAmountModalVisible] = useState<boolean>(false);

  const onPressCopy = useCallback(() => {
    if (props.address) {
      Clipboard.setString(props.address);
    }
    Toast.show(t('Copied to clipboard'));
  }, [props.address, t]);

  const onPressShare = useCallback(async () => {
    if (props.address && props.dataToShare) {
      return shareAsImage(props.address, props.dataToShare);
    }
  }, [props.address, props.dataToShare]);

  const {editAmount, editAddress} = props;
  const showAmountModal = useCallback(() => setAmountModalVisible(true), []);
  const hideAmountModal = useCallback(() => setAmountModalVisible(false), []);
  const submitAmount = useCallback(
    (value?: string) => {
      editAmount(value);
      hideAmountModal();
    },
    [editAmount, hideAmountModal],
  );
  const showEditModal = useCallback(() => setEditModalVisible(true), []);
  const hideEditModal = useCallback(() => setEditModalVisible(false), []);
  const submitAddress = useCallback(
    (value?: string) => {
      editAddress(value);
      hideEditModal();
    },
    [editAddress, hideEditModal],
  );

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <TouchableOpacity onPress={onPressCopy} style={styles.icon}>
        <CustomIcon
          name={'copy'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressShare} style={styles.icon}>
        <CustomIcon
          name={'share'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showEditModal} style={styles.icon}>
        <CustomIcon
          name={'edit'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showAmountModal} style={styles.icon}>
        <CustomIcon
          name={'tag'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <SimpleInputModal
        visible={editModalVisible}
        onCancel={hideEditModal}
        onSubmit={submitAddress}
        label={t('Address name')}
        value={props.addressName}
      />
      <SimpleInputModal
        visible={amountModalVisible}
        onCancel={hideAmountModal}
        onSubmit={submitAmount}
        label={t('Amount')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },
});

export default ReceiveControlButtons;
