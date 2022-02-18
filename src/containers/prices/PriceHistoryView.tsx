import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import usePriceHistoryGet from '@slavi/wallet-core/src/providers/ws/hooks/use-price-history-get';
import PriceHistoryChart from '../../components/price-history/price-history-chart';
import ChartButtonsRow from '../../components/price-history/chart-buttons-row';
import store from '@slavi/wallet-core/src/store/index';
import {PriceHistoryElement} from '@slavi/wallet-core/src/providers/ws/messages/currency';
import {useCurrencyRate, useFiatSymbolSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';

export interface PriceHistoryViewProps {
  coin: string;
}
const PriceHistoryView = (props: PriceHistoryViewProps) => {
  const dateNow = new Date();

  const [interval, setInterval] = useState<{start: number; end: number}>({
    end: dateNow.valueOf(),
    start: dateNow.setFullYear(dateNow.getFullYear() - 1).valueOf(),
  });
  const [dataToChart, setDataToChart] = useState<PriceHistoryElement[]>([]);
  const coin = props.coin;

  const fiat = store.useFiatSelector() || 'USD';
  const crypto = store.useCryptoSelector() || 'BTC';
  const fiatSymbol = useFiatSymbolSelector();

  const [coinConvert, setCoinConvert] = useState<string>(coin === crypto ? fiat : crypto);

  const currentRate = useCurrencyRate(coin, coinConvert);

  const {
    state: {history, isLoading},
    setParams,
  } = usePriceHistoryGet();

  useEffect(() => {
    setParams({
      coin: coin,
      coinConvert: coinConvert,
      start: interval.start,
      end: interval.end,
    });
  }, [interval, coinConvert, coin, setParams]);

  useEffect(() => {
    if (!isLoading) {
      setDataToChart(history || []);
    }
  }, [history, isLoading]);

  const onClick = useCallback(
    (startNew: number, endNew: number) => {
      setInterval({start: startNew, end: endNew});
    },
    [setInterval],
  );

  const onClickCurrencyButton = useCallback(
    (currency: string) => {
      setCoinConvert(currency);
    },
    [setCoinConvert],
  );

  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {dataToChart && dataToChart.length > 0 && (
        <PriceHistoryChart
          coin={coin}
          coinConvert={coinConvert === fiat ? fiatSymbol : crypto}
          elements={dataToChart}
          currentRate={currentRate}
          precision={coinConvert === fiat ? 2 : 8}
        />
      )}
      <ChartButtonsRow
        onTimeButtonClick={onClick}
        disabled={isLoading}
        onCurrencyButtonClick={onClickCurrencyButton}
        currencyFirst={coin !== crypto ? crypto : fiat}
        currencySecond={coin !== crypto ? fiat : null}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

export default PriceHistoryView;
