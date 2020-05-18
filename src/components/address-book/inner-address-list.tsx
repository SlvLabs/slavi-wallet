import React from 'react';
import {AddressEntry} from '../modal/address-selector-modal';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import InnerAddressElement from './inner-address-element';
import {Icon} from 'react-native-elements';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';

export interface InnerAddressListProps {
  addresses: AddressEntry[];
  onPressElement: (index: number) => void;
  containerStyle?: ViewStyle;
  placeholderContainerStyle?: ViewStyle;
  placeholderSize?: number;
  placeholderColor?: string;
  placeholderTextStyle?: TextStyle;
}

const defaultPlaceholderSize = 256;
const defaultPlaceholderColor = theme.colorsOld.cultured;

const InnerAddressList = (props: InnerAddressListProps) => {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {!!props.addresses && props.addresses.length > 0 ? (
        <View style={styles.listContainer}>
          {props.addresses.map((element, index) => (
            <TouchableOpacity
              onPress={() => props.onPressElement(index)}
              key={`address_${index}`}>
              <InnerAddressElement
                name={element.name}
                address={element.address}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View
          style={{
            ...styles.placeholderContainer,
            ...props.placeholderContainerStyle,
          }}>
          <Icon
            name={'grid'}
            type={'feather'}
            size={props.placeholderSize || defaultPlaceholderSize}
            color={props.placeholderColor || defaultPlaceholderColor}
          />
          <Text
            style={{...styles.placeholderText, ...props.placeholderTextStyle}}>
            {t('Addresses not found')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {},
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.4,
    color: theme.colorsOld.cultured,
    textAlign: 'center',
  },
});

export default InnerAddressList;
