import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import PricePairElement from './price-pair-element';
import {PricePairsListElement} from '@slavi/wallet-core/src/providers/ws/messages';
import {useTranslation} from 'react-i18next';

export interface PricePairsElementsListProps {
  elements: PricePairsListElement[];
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const PricePairsList = (props: PricePairsElementsListProps) => {
  const {t} = useTranslation();
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text>Trading pairs</Text>
      <View style={styles.contentContainer}>
        <PricePairElement
          element={{
            exchangeName: t('Exchange'),
            exchangeImg: null,
            volumePercent: -1,
            price: t('Price'),
            pair: t('Pair'),
            coinName: t('Coin'),
            volume24: t('Volume24'),
          }}
        />
        {props.elements.map((element, index) => {
          return (
            <PricePairElement
              element={element}
              key={`price_pair_element_${index}`}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {},
  titleContainer: {},
  contentContainer: {},
});

export default PricePairsList;
