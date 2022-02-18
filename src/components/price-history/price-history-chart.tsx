import React, {useCallback, useEffect, useState} from 'react';
import {ChartSelectEvent, Color, LineChart} from 'react-native-charts-wrapper';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  processColor,
} from 'react-native';
import useTranslation from '../../utils/use-translation';
import { PriceHistoryElement } from '@slavi/wallet-core/src/providers/ws/messages/currency';
import theme from '../../theme';
import moment from 'moment';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface PriceHistoryChartData {
  elements: PriceHistoryElement[];
  coin: string;
  precision: number;
  coinConvert?: string;
  currentRate?: number;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const DATE_FORMAT = 'MMMM DD YYYY, h:mm:ss a';

const PriceHistoryChart = (props: PriceHistoryChartData) => {
  const {elements, coinConvert, currentRate, precision} = props;

  const [values, setValues] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>();
  const [selectedRate, setSelectedRate] = useState<number | undefined>(currentRate);
  const [indicatorEnabled, setIndicatorEnabled] = useState<boolean>(false);

  const {t} = useTranslation();

  useEffect(() => {
    let needUpdate = elements.length !== values.length;
    if (!needUpdate && elements.length) {
      let len = elements.length;
      for (let i = 0; i < len; ++i) {
        if (+elements[i].price !== values[i].y) {
          needUpdate = true;
          break;
        }
      }
    }
    if (needUpdate) {
      let tmp = elements.map((el) => {
        let date = new Date(el.priceDate);
        return {
          x: Math.round(date.valueOf()),
          y: +el.price,
          marker: t('date') + ': ' + date.toString(),
        };
      });
      setValues(tmp);
    }
  }, [elements, values, t]);

  useEffect(() => setSelectedRate(currentRate), [currentRate]);

  const onChartSelect = useCallback((event: ChartSelectEvent) => {
    const {nativeEvent} = event;
    if(!nativeEvent) {
      return;
    }

    const {x, y} = nativeEvent;

    setSelectedDate(x);
    setSelectedRate(y);
  }, []);

  const enableIndicator = useCallback(() => setIndicatorEnabled(true), []);
  const disableIndicator = useCallback(() => {
    setIndicatorEnabled(false);
    setSelectedRate(currentRate);
    setSelectedDate(undefined);
  }, [currentRate]);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.contentContainer}>
        <View style={styles.valueContainer}>
          <Text style={styles.rate}>{selectedRate ? `${makeRoundedBalance(precision, selectedRate)} ${coinConvert}`: ''}</Text>
          <Text style={styles.date}>{selectedDate ? moment(selectedDate).format(DATE_FORMAT) : ''}</Text>
        </View>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                values: values,
                config: {
                  drawValues: false,
                  lineWidth: 2,
                  drawCircles: false,
                  color: (processColor(theme.colors.green) as  Color | undefined),
                  drawFilled: true,
                  fillGradient: {
                    colors: [processColor(theme.colors.green) as  Color | undefined, processColor('transparent') as  Color | undefined],
                    positions: [0, 0.5],
                    angle: 90,
                    orientation: "TOP_BOTTOM"
                  },
                  fillAlpha: 1000,
                  drawHorizontalHighlightIndicator: false,
                  highlightLineWidth: 2,
                  highlightColor: (processColor(theme.colors.darkGreen1) as  Color | undefined),
                  highlightEnabled: indicatorEnabled,
                }
              },
            ]
          }}
          chartDescription={{text: ''}}
          legend={{
            enabled: false,
          }}
          marker={{
            enabled: false,
          }}
          xAxis={{
            enabled: false,
          }}
          yAxis={{
            left: {
              enabled: false,
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
          pinchZoom={true}
          maxVisibleValueCount={16}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
          onSelect={onChartSelect}
          onTouchStart={enableIndicator}
          onTouchEnd={disableIndicator}
          onTouchCancel={disableIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    flex: 1,
  },
  contentContainer: {
    height: 250,
  },
  chart: {
    flex: 1,
    maxWidth: '100%',
    padding: 5,
  },
  rate: {
    fontFamily: theme.fonts.default,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 22,
    color: theme.colors.white,
  },
  date: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.hardTransparent,
  },
  valueContainer: {
    alignItems: 'center',
  }
});

export default PriceHistoryChart;
