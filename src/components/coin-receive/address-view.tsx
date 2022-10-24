import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';

export interface AddressViewProps {
  address: string;
  ticker: string;
  name?: string;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
}

const AddressView = (props: AddressViewProps) => {
  const {t} = useTranslation();
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.name, ...props.nameStyle}}>
        {props.name || t('tickerAddress', {ticker: props.ticker})}
      </Text>
      <Text style={{...styles.address, ...props.addressStyle}}>{props.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
  },
  centredElement: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 14,
    fontSize: 12,
    textAlign: 'left',
    color: theme.colors.lightScroll,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 7,
    color: theme.colors.white,
  },
});

export default AddressView;
