import React, {useCallback, useEffect, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import {FlatList, Image, ListRenderItemInfo, StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import {
  CoinFullListElement,
  useCoinsFullList
} from '@slavi/wallet-core/src/providers/ws/hooks/coins/use-coins-full-list';
import Spinner from '../../components/spinner';
import SearchInput from '../../components/controls/search-input';
import theme from '../../theme';
import { Text } from 'react-native';
import Screen from '../../components/screen';
import getImageSource from '../../utils/get-image-source';
import Layout from '../../utils/layout';
import {zoom_plus} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import SimpleToast from 'react-native-simple-toast';

export function CoinFullListScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [search, setSearch] = useState<string>('');

  const {loading, error, coins, onShownChange} = useCoinsFullList(search);

  const addCustomToken = useCallback(() => {
    navigation.navigate(ROUTES.COINS.TOKEN_ADDING)
  }, [navigation]);

  useEffect(() => {
    if(error) {
      SimpleToast.show(t('internal error'));
    }
  }, [error])

  const renderItem = useCallback(({item}: ListRenderItemInfo<CoinFullListElement>) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftColumn}>
          <Image source={getImageSource(item.logo)} style={styles.logo} />
          <View style={styles.nameColumn}>
            <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <View style={styles.tickerColumn}>
            <Text style={styles.ticker}>{item.ticker}</Text>
          </View>
        </View>
        <Switch
          value={item.shown}
          onValueChange={() => onShownChange(item.id)}
          thumbColor={theme.colors.white}
          trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
        />
      </View>
    );
  }, []);

  return (
    <Screen title={t('addAssets')} contentStyle={styles.container}>
      {loading ? (
        <Spinner containerStyle={styles.spinner}/>
      ) : (
        <View style={styles.content}>
          <SearchInput
            value={search}
            onChange={setSearch}
            containerStyle={styles.searchContainer}
            placeholder={t('Search...')}
          />
            <FlatList<CoinFullListElement>
              data={coins}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <TouchableOpacity style={styles.addTokenContainer} onPress={addCustomToken}>
                  <Image source={zoom_plus} style={styles.plusImage} />
                  <Text style={styles.addTokenText}>{t('Add custom token')}</Text>
                </TouchableOpacity>
              }
            />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Layout.window.height,
    paddingBottom: 50,
  },
  list: {
    paddingBottom: 100,
  },
  searchContainer: {
    marginBottom: 16,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.simpleCoinBackground,
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  nameColumn: {
    flexDirection: 'column',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
    maxWidth: Layout.isSmallDevice ? 100 : 150
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
    textTransform: 'uppercase',
  },
  tickerColumn: {
    marginLeft: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  leftColumn: {
    flexDirection: 'row',
  },
  spinner: {
    alignSelf: 'center',
  },
  plusImage: {
    width: 32,
    height: 32,
    marginRight: 18,
  },
  addTokenText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.white,
  },
  addTokenContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.simpleCoinBackground,
    marginBottom: 8,
  },
});
