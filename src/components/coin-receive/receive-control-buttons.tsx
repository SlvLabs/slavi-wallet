import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';
import shareAsImage from '../../utils/share-as-image';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import SimpleInputModal from '../modal/simple-input-modal';
import Layout from '../../utils/layout';

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

const defaultIconSize = 24;
const defaultIconColor = theme.colors.textLightGray3;

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
    console.log('onPressShare', props)
    if (props.address && props.dataToShare) {
      console.log(props.address, props.dataToShare)
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
          name={'copy2'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressShare} style={styles.icon}>
        <CustomIcon
          name={'share2'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showEditModal} style={styles.icon}>
        <CustomIcon
          name={'edit2'}
          size={props.iconsSize || defaultIconSize}
          color={props.iconsColor || defaultIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showAmountModal} style={styles.icon}>
        <CustomIcon
          name={'tag2'}
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
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: theme.colors.simpleCoinBackground,
    padding: Layout.isSmallDevice ? 8 : 16,
    borderRadius: 8,
    width: Layout.isSmallDevice ? 66 : 76,
    height: Layout.isSmallDevice ? 40 : 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReceiveControlButtons;
