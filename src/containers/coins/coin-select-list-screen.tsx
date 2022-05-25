import React, {useCallback} from 'react';
import {Keyboard, SafeAreaView, StyleSheet, View} from 'react-native';
import useCoinsSelector from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import theme from '../../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import CoinSelectList from '../../components/coins/coins-select-list';

export default function CoinSelectListScreen() {
  const {params} = useRoute();
  const {nextScreen, filter, balanceShown} = params as any;
  if(!nextScreen) {
    throw new Error('Wrong coins routing');
  }

  const coins = useCoinsSelector(filter);

  const navigation = useNavigation();

  const onElementPress = useCallback(
    (coinId: string) => navigation.navigate(nextScreen, {coin: coinId}),
    [navigation]
  );

  const goBack = useCallback(() => {
    if(navigation.canGoBack()) {
      navigation.goBack();
      Keyboard.dismiss();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CoinSelectList
          coins={coins}
          balanceShown={balanceShown}
          onElementPress={onElementPress}
          onBackPress={goBack}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.screenBackground,
    flex: 1,
  },
  content: {
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
