import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import {bifinity, switchere} from '../../assets/images';
import {BuySource} from '@slavi/wallet-core/src/providers/ws/messages/buy-coin';
import CustomIcon from '../custom-icon/custom-icon';
import makeRoundedBalance from '../../utils/make-rounded-balance';

interface ServiceProviderOptionProps {
  containerStyle?: ViewStyle;
  source: BuySource;
  selectSource(newSource: BuySource): unknown;
  isSelected: boolean;
  isBestPrice: boolean;
  price: string;
  ticker: string;
}

export const ServiceProviderOption = ({
  containerStyle,
  source,
  isBestPrice,
  isSelected,
  selectSource,
  price,
  ticker,
}: ServiceProviderOptionProps) => {
  const {t} = useTranslation();
  const onPress = useCallback(() => {
    if (!isSelected) {
      selectSource(source);
    }
  }, [source, selectSource, isSelected]);
  const _price = useMemo(() => makeRoundedBalance(4, price), [price]);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isSelected}
      style={{...styles.optionContainer, ...containerStyle, ...(isSelected && styles.selectedOptionContainer)}}>
      <View style={styles.row}>
        <Image source={source === BuySource.binance ? bifinity : switchere} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.upText}>{t(source === BuySource.binance ? 'Bifinity' : 'Switchere')}</Text>
          <Text style={styles.downText}>{`~ ${_price} ${ticker}`}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedColumn}>
            <CustomIcon name={'check'} size={24} color={theme.colors.darkGreen1} />
          </View>
        )}
      </View>
      {isBestPrice && <Text style={styles.bestPrice}>{t('Best price')}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    paddingLeft: 20,
    paddingRight: 15.5,
    paddingTop: 15.5,
    paddingBottom: 16,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 20,
    paddingRight: 15.5,
    paddingTop: 15.5,
    paddingBottom: 16,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOptionContainer: {
    borderColor: theme.colors.darkGreen1,
  },
  bestPrice: {
    position: 'absolute',
    left: -1,
    top: -8,
    backgroundColor: theme.colors.darkGreen1,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    color: theme.colors.white,
    fontSize: 10,
    lineHeight: 14,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    marginLeft: 16,
  },
  selectedColumn: {
    marginLeft: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  image: {
    width: 40,
    height: 40,
  },
  upText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  downText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.lightGray,
    // textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
});
