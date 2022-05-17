import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import DecimalInput, {DecimalType} from '../controls/decimal-input';
import theme from '../../theme';
import getImageSource from '../../utils/get-image-source';
import CustomIcon from '../custom-icon/custom-icon';
import React, {useCallback, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import CurrencySelectModal from './currency-select-modal';

export interface Currency {
  ticker: string;
  img?: string;
  name?: string;
}

export interface CurrencySelectProps {
  currency: string;
  setCurrency: (currency: string) => void;
  currencyAmount: string;
  setCurrencyAmount: (currencyAmount: string) => void;
  currencies: Currency[];
  containerStyle?: ViewStyle;
}

export const CurrencySelect = (props: CurrencySelectProps) => {
  const {containerStyle, currencies, currency, currencyAmount, setCurrency, setCurrencyAmount} = props;
  const {t} = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies.find(x => x.ticker === currency) || currencies[0],
  );

  const [currencyModalVisible, setCurrencyModalVisible] = useState<boolean>(false);
  const showCurrencyModal = useCallback(() => setCurrencyModalVisible(true), []);
  const hideCurrencyModal = useCallback(() => setCurrencyModalVisible(false), []);

  const onCurrencySelected = useCallback((newCurrency: Currency) => {
      setSelectedCurrency(newCurrency);
      setCurrency(newCurrency.ticker);
      hideCurrencyModal();
  }, [setCurrency, hideCurrencyModal]);
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>{t('youPay')}</Text>
        <DecimalInput
          value={currencyAmount}
          onChange={setCurrencyAmount}
          inputType={DecimalType.Real}
          errorContainerStyle={styles.errorInput}
          disableErrorStyle={true}
          inputContainerStyle={styles.srcInput}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.coinsRow} onPress={showCurrencyModal}>
            <Image source={getImageSource(selectedCurrency?.img)} style={styles.image}/>
            <Text style={styles.ticker}>{selectedCurrency?.ticker}</Text>
            <CustomIcon name={'arrow-right1'} size={8} color={theme.colors.textLightGray1}/>
          </TouchableOpacity>
        </View>
      </View>
      <CurrencySelectModal
        currencies={currencies}
        onElementPress={onCurrencySelected}
        visible={currencyModalVisible}
        onCancel={hideCurrencyModal}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    marginTop: 14,
  },
  rightColumn: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  image: {
    width: 32,
    height: 32,
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 12,
    marginRight: 12,
  },
  coinsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorInput: {
    display: 'none',
  },
  srcInput: {
    paddingTop: 9,
    marginTop: 0,
    paddingBottom: 5,
    paddingLeft: 0,
    marginRight: 10,
  },
  input: {
    lineHeight: 21,
  },
});
