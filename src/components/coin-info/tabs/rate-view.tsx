import {StyleSheet, View} from 'react-native';
import React from 'react';
import PriceHistoryView from '../../../containers/prices/PriceHistoryView';

export interface RateViewProps {
  coin: string;
}

const RateView = (props: RateViewProps) => {
  return (
    <View style={styles.container}>
      <PriceHistoryView coin={props.coin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RateView;
