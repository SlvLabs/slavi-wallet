import {StyleSheet, View} from 'react-native';
import React from 'react';
import PriceHistoryView from '../../../containers/prices/PriceHistoryView';
import PricePairsView from '../../../containers/prices/PricePairsView';

export interface RateViewProps {
  coin: string;
}

const RateView = (props: RateViewProps) => {
  return (
    <View style={styles.container}>
      <PriceHistoryView coin={props.coin} />
      <PricePairsView coin={props.coin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RateView;
