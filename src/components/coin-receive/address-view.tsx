import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';

export interface AddressViewProps {
  address: string;
  name?: string;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
}

const AddressView = (props: AddressViewProps) => {
  return (
    <View>
      <View>
        {!!props.name && (
          <View style={styles.centredElement}>
            <Text style={{...styles.name, ...props.nameStyle}}>
              {props.name}
            </Text>
          </View>
        )}
        <View style={styles.centredElement}>
          <Text style={{...styles.address, ...props.addressStyle}}>
            {props.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  centredElement: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AddressView;
