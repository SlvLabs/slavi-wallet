import React from 'react';
import {StyleSheet, View, ViewStyle, Text, TextStyle} from 'react-native';
import theme from '../../theme';
import {Icon} from 'react-native-elements';

export interface OperationConvertedBalancesProps {
  cryptoBalance: string;
  fiatBalance: string;
  cryptoTicker: string;
  fiatTicker: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const OperationConvertedBalances = (props: OperationConvertedBalancesProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.cryptoBalance, ...props.textStyle}}>
        {`${props.cryptoBalance} ${props.cryptoTicker}`}
      </Text>
      <View style={styles.delimiter}>
        <Icon
          name={'circle'}
          type={'material'}
          size={4}
          color={theme.colorsOld.lightGray}
        />
      </View>
      <Text style={{...styles.fiatBalance, ...props.textStyle}}>
        {`${props.fiatBalance} ${props.fiatTicker}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cryptoBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
  },
  fiatBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
  },
  delimiter: {
    justifyContent: 'center',
    paddingLeft: 2,
    paddingRight: 2,
  },
});

export default OperationConvertedBalances;
