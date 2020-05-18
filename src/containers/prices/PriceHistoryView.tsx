import {ActivityIndicator, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import usePriceHistoryGet from '@slavi/wallet-core/src/providers/ws/hooks/use-price-history-get';
import PriceHistoryChart from '../../components/price-history/price-history-chart';
import ChartButtonsRow from '../../components/price-history/chart-buttons-row';
import {PriceHistoryElement} from '@slavi/wallet-core/src/providers/ws/messages';
import store from '@slavi/wallet-core/src/store/index';

export interface PriceHistoryViewProps {
  coin: string;
}
const PriceHistoryView = (props: PriceHistoryViewProps) => {
  const fiat = store.useFiatSelector() || 'USD';
  const crypto = store.useCryptoSelector() || 'BTC';
  const dateNow = new Date();
  const [interval, setInterval] = useState<{start: number; end: number}>({
    end: dateNow.valueOf(),
    start: dateNow.setFullYear(dateNow.getFullYear() - 1).valueOf(),
  });
  const [dataToChart, setDataToChart] = useState<PriceHistoryElement[]>([]);
  const coin = props.coin;
  const [coinConvert, setCoinConvert] = useState<string>(
    coin === crypto ? fiat : crypto,
  );

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
  useEffect(() => {
    if (!isLoading) {
      setDataToChart(history);
    }
  }, [history, isLoading]);
  return (
    <ScrollView>
      {isLoading && <ActivityIndicator />}
      {dataToChart && dataToChart.length > 0 && (
        <PriceHistoryChart
          coin={coin}
          coinConvert={coinConvert}
          elements={dataToChart}
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

export default PriceHistoryView;
