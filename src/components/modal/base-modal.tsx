import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';

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

const BaseModal = (props: BaseModalProps) => {
  const content = (
    <View style={{...styles.modalView, ...props.modalStyle}} >
      <TouchableWithoutFeedback>
        <View style={{...styles.modalContent, ...props.contentStyle}}>
          {!!props.showCloseIcon && (
            <View style={styles.closeButtonRow}>
              {props.header}
              <CustomIcon name={'close'} size={24} color={theme.colors.textLightGray3} onPress={props.onCancel} style={styles.closeIcon}/>
            </View>
          )}
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible} statusBarTranslucent={true}>
      {props.onCancel ? (
        <TouchableOpacity style={styles.centeredView} onPress={props.onCancel}>
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
