import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import FullFilterCoinElement from './full-filter-coin-element';
import {CoinDisplayData} from '../../coin-list/coins-list-element';

export interface FullFilterCoinListProps {
  coins: CoinDisplayData[];
  onSelect: (coins: string) => void;
  selectedCoins?: Record<string, boolean>;
  containerStyle?: ViewStyle;
}

const FullFilterCoinList = (props: FullFilterCoinListProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {props.coins.map((coin, index) => (
        <FullFilterCoinElement
          name={coin.name}
          onPress={() => props.onSelect(coin.id)}
          logo={coin.logo}
          type={coin.type}
          selected={props.selectedCoins?.[coin.id]}
          key={`filter_coin_${index}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FullFilterCoinList;
