import React, {useCallback} from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import CustomIcon from '../custom-icon/custom-icon';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import Layout from '../../utils/layout';

export interface InnerAddressElementProps {
  address: string;
  name?: string;
  balance?: string;
  ticker?: string;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
  balanceStyle?: TextStyle;
  balancePrecision?: number;
  baseBalance?: string;
  baseTicker?: string;
}

const DEFAULT_PRECISION = 4;

const InnerAddressElement = (props: InnerAddressElementProps) => {
  const {t} = useTranslation();

  const onPressCopy = useCallback(() => {
    if (props.address) {
      Clipboard.setString(props.address);
    }
    Toast.show(t('Copied to clipboard'));
  }, [props.address, t]);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={props.baseTicker ? styles.leftColumnWithCopy : styles.leftColumn}>
        <View style={styles.topRow}>
          <Text style={{...styles.name, ...props.nameStyle}} ellipsizeMode={'tail'} numberOfLines={1}>
            {props.name || t('No name')}
          </Text>
          {!!props.balance && (
            <Text style={{...styles.balance, ...props.balanceStyle}}>
              {`${makeRoundedBalance(props.balancePrecision || DEFAULT_PRECISION, props.balance)} ${props.ticker}`}
            </Text>
          )}
        </View>
        <Text style={{...styles.address, ...props.addressStyle}} ellipsizeMode={'middle'} numberOfLines={1}>
          {props.address}
        </Text>
        {!!props.baseTicker && (
          <Text style={styles.baseBalance}>
            {t('baseBalance', {
              ticker: props.baseTicker,
              balance: makeRoundedBalance(props.balancePrecision || DEFAULT_PRECISION, props.baseBalance || '0'),
            })}
          </Text>
        )}
      </View>
      {!!props.baseTicker && (
        <TouchableOpacity onPress={onPressCopy} style={styles.icon}>
          <CustomIcon name={'copy2'} size={16} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderColor: theme.colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    color: theme.colors.darkGreen1,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 22,
    color: theme.colors.borderGreen,
  },
  leftColumnWithCopy: {
    width: Layout.window.width - 96,
  },
  leftColumn: {
    width: '100%',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    padding: 10,
    backgroundColor: theme.colors.simpleCoinBackground,
  },
  baseBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
    letterSpacing: 0.02,
  },
});

export default InnerAddressElement;
