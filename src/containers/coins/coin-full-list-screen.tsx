import React, {useCallback, useEffect, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import {FlatList, Image, ListRenderItemInfo, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CoinFullListElement as CoinFullListElementData,
  useCoinsFullList
} from '@slavi/wallet-core/src/providers/ws/hooks/coins/use-coins-full-list';
import Spinner from '../../components/spinner';
import theme from '../../theme';
import { Text } from 'react-native';
import Screen from '../../components/screen';
import Layout from '../../utils/layout';
import {zoom_plus} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import SimpleToast from 'react-native-simple-toast';
import SimpleInput from '../../components/controls/simple-input';
import CustomIcon from '../../components/custom-icon/custom-icon';
import {CoinFullListElement} from '../../components/coin-full-list/coin-full-list-element';

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

  const renderItem = useCallback(({item}: ListRenderItemInfo<CoinFullListElementData>) => {
    return (
      <CoinFullListElement
          name={item.name}
          ticker={item.ticker}
          shown={item.shown}
          logo={item.logo}
          type={item.type}
          onShownChange={() => onShownChange(item.id)}
      />
    );
  }, []);

  return (
    <Screen title={t('addAssets')} contentStyle={styles.container}>
      {loading ? (
        <Spinner containerStyle={styles.spinner}/>
      ) : (
        <View style={styles.content}>
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
          <FlatList<CoinFullListElementData>
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
    paddingBottom: 80,
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
  },
});
