import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import FullFilterAddressElement from './full-filter-address-element';
import {
  AddressTypeInBook,
  AddressDataInBook,
} from '@slavi/wallet-core/src/store/modules/address-book/selectors';

export interface FullFilterAddressListProps {
  addresses: AddressDataInBook[];
  types: AddressTypeInBook[];
  onSelect: (address: number) => void;
  selectedAddresses?: Record<number, boolean>;
  containerStyle?: ViewStyle;
  elementStyle?: ViewStyle;
}

const FullFilterAddressList = (props: FullFilterAddressListProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {props.addresses.map(element => (
        <FullFilterAddressElement
          selected={props.selectedAddresses?.[element.id]}
          address={element.address}
          name={element.name}
          onPress={() => props.onSelect(element.id)}
          key={`filter_address_${element.id}`}
          containerStyle={props.elementStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FullFilterAddressList;
