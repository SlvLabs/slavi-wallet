import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  processColor,
} from 'react-native';
import {PriceHistoryElement} from '@slavi/wallet-core/src/providers/ws/messages';
import {useTranslation} from 'react-i18next';

export interface PriceHistoryChartData {
  elements: PriceHistoryElement[];
  coin: string;
  coinConvert: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const PriceHistoryChart = (props: PriceHistoryChartData) => {
  const [values, setValues] = useState<any[]>([]);
  const history = props.elements;
  const {t} = useTranslation();

  useEffect(() => {
    let needUpdate = history.length !== values.length;
    if (!needUpdate && history.length) {
      let len = history.length;
      for (let i = 0; i < len; ++i) {
        if (+history[i].price !== values[i].y) {
          needUpdate = true;
          break;
        }
      }
    }
    if (needUpdate) {
      let tmp = history.map((el) => {
        let date = new Date(el.priceDate);
        return {
          x: Math.round(date.valueOf() / (1000 * 60)),
          y: +el.price,
          marker: t('date') + ': ' + date.toString(),
        };
      });
      setValues(tmp);
    }
  }, [history, values, t]);
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text>{t('Price history chart')}</Text>
      <View style={styles.contentContainer}>
        <LineChart
          style={styles.chart}
          data={{dataSets: [{values: values, label: 'a'}]}}
          chartDescription={{text: ''}}
          legend={{
            enabled: false,
          }}
          marker={{
            enabled: true,
            markerColor: processColor('white'),
            textColor: processColor('black'),
          }}
          xAxis={{
            enabled: true,
            granularityEnabled: true,
            axisLineWidth: 0,
            granularity: 1,
            labelCount: 4,
            position: 'BOTTOM',
            drawGridLines: false,
            fontFamily: 'HelveticaNeue-Medium',
            textColor: processColor('gray'),
            valueFormatter: 'date',
            valueFormatterPattern: 'dd-MM-yy',
            since: 0,
            timeUnit: 'MINUTES',
          }}
          yAxis={{
            left: {
              enabled: true,
            },
            right: {
              enabled: false,
            },
          }}
          autoScaleMinMaxEnabled={true}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: 'EaseInOutQuart',
          }}
          drawGridBackground={false}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={true}
          pinchZoom={false}
          maxVisibleValueCount={16}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {},
  titleContainer: {},
  contentContainer: {
    height: 250,
  },
  chart: {
    flex: 1,
    padding: 5,
  },
});

export default PriceHistoryChart;
