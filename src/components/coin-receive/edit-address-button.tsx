import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IconNode} from 'react-native-elements';
import SimpleInputModal from '../modal/simple-input-modal';
import SolidButton from '../buttons/solid-button';

export interface EditAddressButtonProps {
  title: string;
  onSubmit: (name?: string) => void;
  icon?: IconNode;
  containerStyle?: ViewStyle;
  nameInputLabel?: string;
  nameValue?: string;
}

const EditAddressButton = (props: EditAddressButtonProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = useCallback(
    (name?: string) => {
      props.onSubmit(name);
      setModalVisible(false);
    },
    [props],
  );

  const hideModal = useCallback(() => setModalVisible(false), []);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <SolidButton
        onPress={() => setModalVisible(true)}
        title={props.title}
        icon={props.icon}
      />
      <SimpleInputModal
        visible={modalVisible}
        onSubmit={onSubmit}
        label={props.nameInputLabel}
        onCancel={hideModal}
        value={props.nameValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    paddingBottom: 20,
  },
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    minHeight: 20,
  },
  modalInput: {},
});

export default EditAddressButton;
