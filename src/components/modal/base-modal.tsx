import {Dimensions, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import React from 'react';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import {useSelectIsAuthorized} from '@slavi/wallet-core/src/store/modules/auth/selectors';

export interface ModalProps {
  visible?: boolean;
  onCancel?: () => void;
  modalStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  header?: React.ReactNode;
  showCloseIcon?: boolean;
}

export interface BaseModalProps extends ModalProps {
  children?: React.ReactNode;
}

const BaseModal = ({modalStyle, showCloseIcon, contentStyle, header, onCancel, children, visible}: BaseModalProps) => {
  const isAuth = useSelectIsAuthorized();

  const content = (
    <View style={{...styles.modalView, ...modalStyle}}>
      <TouchableWithoutFeedback>
        <View style={{...styles.modalContent, ...contentStyle}}>
          {!!showCloseIcon && (
            <View style={styles.closeButtonRow}>
              {header}
              <CustomIcon
                name={'close'}
                size={24}
                color={theme.colors.textLightGray3}
                onPress={onCancel}
                style={styles.closeIcon}
              />
            </View>
          )}
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isAuth && visible}
      statusBarTranslucent={true}
      onRequestClose={onCancel}>
      {onCancel ? (
        <TouchableOpacity style={styles.centeredView} onPress={onCancel}>
          {content}
        </TouchableOpacity>
      ) : (
        <View style={styles.centeredView}>{content}</View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: theme.colors.grayDark,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  closeButtonRow: {
    position: 'absolute',
    right: 14,
    top: 14,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // width: '100%',
  },
  closeIcon: {
    zIndex: 101,
  },
});

export default BaseModal;
