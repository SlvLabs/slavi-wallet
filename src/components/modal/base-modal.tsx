import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../../theme';

export interface ModalProps {
  visible: boolean;
  onCancel?: () => void;
  modalStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

export interface BaseModalProps extends ModalProps {
  children: React.ReactNode;
}

const BaseModal = (props: BaseModalProps) => {
  const content = (
    <View style={{...styles.modalView, ...props.modalStyle}}>
      <View style={{...styles.modalContent, ...props.contentStyle}}>
        {props.children}
      </View>
    </View>
  );
  // TODO: подумать можно ли как-то посимпотичнее обработать чтобы клик на пустое место внутри контейнера не закрывал модалку
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
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
    margin: 32,
    backgroundColor: theme.colorsOld.white,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default BaseModal;
