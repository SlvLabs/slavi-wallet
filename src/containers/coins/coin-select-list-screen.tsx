import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import useCoinsSelector from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import theme from '../../theme';
import SimpleInput from '../../components/controls/simple-input';
import CustomIcon from '../../components/custom-icon/custom-icon';
import {useTranslation} from 'react-i18next';
import SimpleCoinListElement from '../../components/coins/simple-coin-list-element';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CoinDisplayData} from '../../components/coin-list/coins-list-element';

export default function CoinSelectListScreen() {
  const {params} = useRoute();
  const {nextScreen} = params as any;
  if(!nextScreen) {
    throw new Error('Wrong coins routing');
  }

  const coins = useCoinsSelector();

  const [search, setSearch] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<CoinDisplayData[]>(coins);

  const {t} = useTranslation();
  const navigation = useNavigation();

  useEffect(() => setFilteredCoins(coins.filter(element =>
    element.name.toLowerCase().includes(search.toLowerCase()) ||
    element.ticker.toLowerCase().includes(search.toLowerCase())
  )), [search]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <SimpleInput
            value={search}
            onChange={setSearch}
            placeholder={t('Search...')}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor={theme.colors.textLightGray3}
            inputStyle={styles.input}
            iconLeft={true}
            icon={<CustomIcon name={'search'} size={22} color={theme.colors.textLightGray1}
            />}
          />
        </View>
        <ScrollView>
          {filteredCoins.map((item, index) => (
            <SimpleCoinListElement
              name={item.name}
              type={item.type}
              logo={item.logo}
              onPress={() => navigation.navigate(nextScreen, {coin: item.id})}
              key={`coin_${index}`}
            />
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.screenBackground,
    flex: 1,
    padding: 16,
  },
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
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
  }
});
