import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import CoinsListElement, {CoinDisplayData} from './coins-list-element';
import theme from '../../theme';

export enum showCoinsEnum {
  onlyShown = 0,
  onlyNotShown = 1,
  all = 2,
}

export interface CoinListProps {
  coins: CoinDisplayData[];
  onElementPress(ticker: string): void;
  toShow: showCoinsEnum;
  onShownChange(ticker: string): void;
  fiat: string;
  crypto: string;
  fiatSymbol: string;
}

const CoinsList = (props: CoinListProps) => {
  const renderItem = (item: CoinDisplayData, index: number) => {
    return (
      <CoinsListElement
        showElement={
          props.toShow === showCoinsEnum.all
            ? true
            : props.toShow === showCoinsEnum.onlyShown
            ? item.shown
            : !item.shown
        }
        showControl={props.toShow > 0}
        data={item}
        key={index}
        onShownChange={props.onShownChange}
        onPress={() => {
          if (typeof props.onElementPress === 'function') {
            props.onElementPress(item.id);
          }
        }}
        fiat={props.fiat}
        crypto={props.crypto}
        fiatSymbol={props.fiatSymbol}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/*<CoinListElementSoon logo={'/images/metis.png'} name={'MetisDAO'} ticker={'METIS'}/>*/}
      {props.coins && props.coins.length > 0 ? (
        props.coins.map(renderItem)
      ) : (
        <View style={styles.placeholder}>
          <View style={styles.placeholderIcon}>
            <Icon
              name={'appstore-o'}
              type={'antdesign'}
              color={theme.colors.grayDark}
              size={150}
            />
          </View>
          <Text style={styles.placeholderText}>No coins</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop: 16,
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
    color: theme.colorsOld.text.secondary,
  },
  list: {
    flex: 1,
    minHeight: Dimensions.get('window').height - 345,
  },
});

export default CoinsList;
