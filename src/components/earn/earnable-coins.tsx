import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CoinFromEarnableList} from '@slavi/wallet-core/src/providers/ws/messages/earning';
import React from 'react';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import Layout from '../../utils/layout';
import useTranslation from '../../utils/use-translation';
import {Icon} from 'react-native-elements';

export interface EarnableCoinsProps {
  coins: CoinFromEarnableList[] | null;
  isListDisplayMode: boolean;
  onCoinPress: (coin: CoinFromEarnableList) => void;
}

interface PlateColumnProps {
  coins: CoinFromEarnableList[];
  onCoinPress: (coin: CoinFromEarnableList) => void;
}

const PlateColumn = (props: PlateColumnProps) => {
  const {coins, onCoinPress} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.plateColumn}>
      {coins.map((coin, index) => (
        <TouchableOpacity style={styles.coinPlate} key={`plate_${index}`} onPress={() => onCoinPress(coin)}>
          <Image source={getImageSource(coin.logo)} style={styles.plateLogo} />
          <Text style={styles.plateTitle}>{coin.ticker}</Text>
          {!!coin.apy && <Text style={styles.apyText}>{t('stakingUpToApy', {value: coin.apy})}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export function EarnableCoins({coins, isListDisplayMode, onCoinPress}: EarnableCoinsProps) {
  const {t} = useTranslation();
  if (!coins) {
    return (
      <View style={styles.placeholder}>
        <View style={styles.placeholderIcon}>
          <Icon name={'appstore-o'} type={'antdesign'} color={theme.colors.grayDark} size={150} />
        </View>
        <Text style={styles.placeholderText}>{t('No coins')}</Text>
      </View>
    );
  }

  if (isListDisplayMode) {
    return (
      <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.contentRows}>
          {coins.map((coin, index) => (
            <TouchableOpacity style={styles.coinRow} key={`row_${index}`} onPress={() => onCoinPress(coin)}>
              <View style={styles.row}>
                <Image source={getImageSource(coin.logo)} style={styles.listLogo} />
                <Text style={styles.listTitle}>{coin.ticker}</Text>
              </View>
              {!!coin.apy && <Text style={styles.apyText}>{t('stakingUpToApy', {value: coin.apy})}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  const firstColumn: CoinFromEarnableList[] = [];
  const secondColumn: CoinFromEarnableList[] = [];

  coins.forEach((coin, index) => {
    if (index % 2 === 0) {
      firstColumn.push(coin);
    } else {
      secondColumn.push(coin);
    }
  });

  return (
    <View style={styles.contentPlate}>
      <PlateColumn coins={firstColumn} onCoinPress={onCoinPress} />
      <PlateColumn coins={secondColumn} onCoinPress={onCoinPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentRows: {
    marginTop: 16,
  },
  contentPlate: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  coinRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.screenBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  listLogo: {
    width: 32,
    height: 32,
  },
  listTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  coinPlate: {
    backgroundColor: theme.colors.screenBackground,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.isSmallDevice ? 148 : 165,
    marginBottom: 8,
    height: Layout.isSmallDevice ? 102 : 136,
  },
  plateLogo: {
    width: Layout.isSmallDevice ? 40 : 50,
    height: Layout.isSmallDevice ? 40 : 50,
    marginBottom: Layout.isSmallDevice ? 4 : 12,
  },
  plateTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  plateColumn: {
    flexDirection: 'column',
  },
  placeholder: {
    justifyContent: 'center',
  },
  placeholderIcon: {
    marginTop: 50,
    margin: 20,
  },
  placeholderText: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 22,
    color: theme.colors.white,
  },
  apyText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
  },
});
