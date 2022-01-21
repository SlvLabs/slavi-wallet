import React, {useCallback} from 'react';
import {StyleSheet, View, ViewStyle, Text} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import { PricePairsListElement } from '@slavi/wallet-core/src/providers/ws/messages/currency';

export interface PricePairElementProps {
  element: PricePairsListElement;
  containerStyle?: ViewStyle;
}

const renderCell = (data: string) => {
  return (
    <View style={styles.cell}>
      <Text>{data}</Text>
    </View>
  );
};

const renderRow = (row: PricePairsListElement, percentStr: string) => {
  return (
    <ListItem bottomDivider>
      <Avatar
        source={
          row.exchangeImg ? getImageSource(row.exchangeImg) : getImageSource()
        }
      />
      <ListItem.Content style={styles.row}>
        {renderCell(row.exchangeName)}
        {renderCell(row.coinName + '\n' + row.pair)}
        {renderCell(row.price)}
        {renderCell(row.volume24)}
        {renderCell(
          row.volumePercent === -1 ? percentStr : row.volumePercent.toString(),
        )}
      </ListItem.Content>
    </ListItem>
  );
};

const PricePairElement = (props: PricePairElementProps) => {
  const {t} = useTranslation();
  const percentStr = t('Percent');
  const renderContent = useCallback(
    (data?: PricePairsListElement) => {
      if (!data) {
        return;
      }

      return renderRow(data, percentStr);
    },
    [percentStr],
  );

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.contentContainer}>
        {renderContent(props.element)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  cell: {
    flex: 1,
    margin: 1,
    padding: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default PricePairElement;
