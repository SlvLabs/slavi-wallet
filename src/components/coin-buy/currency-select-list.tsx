import React, {useEffect, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import SimpleInput from '../controls/simple-input';
import Layout from '../../utils/layout';
import {CurrencySelectListElement} from './currency-select-list-element';
import {Currency} from './currency-select';

export interface CurrencySelectListProps {
  currencies: Currency[];
  onElementPress: (currency: Currency) => void;
  balanceShown?: boolean;
  onBackPress?: () => void;
}

export default function CurrencySelectList(props: CurrencySelectListProps) {
  const {currencies, onElementPress, onBackPress} = props;

  const [search, setSearch] = useState<string>('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(currencies);

  const {t} = useTranslation();

  useEffect(() => setFilteredCurrencies(
        currencies.filter(
          element =>
            element.name?.toLowerCase().includes(search.toLowerCase()) ||
            element.ticker.toLowerCase().includes(search.toLowerCase()),
        ),
  ), [search, currencies]);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity style={{...styles.button, ...styles.backButton}} onPress={onBackPress}>
          <CustomIcon name={'arrow'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
        <Text style={styles.header}>{t('Select Currency')}</Text>
      </View>
      <View style={styles.searchContainer}>
        <SimpleInput
          value={search}
          onChange={setSearch}
          placeholder={t('Search...')}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor={theme.colors.textLightGray3}
          inputStyle={styles.input}
          iconLeft={true}
          icon={<CustomIcon name={'search'} size={22} color={theme.colors.textLightGray1} />}
        />
      </View>
      <ScrollView style={styles.scroll}>
        {filteredCurrencies.map((item, index) => (
          <CurrencySelectListElement
            currency={item}
            onPress={() => onElementPress(item)}
            key={`currency_${index}`}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: theme.colors.grayDark,
  },
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.textLightGray1,
  },
  scroll: {
    height: Layout.window.height - 220,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
    marginTop: 12,
  },
  header: {
    flex: 8,
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  backButton: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
