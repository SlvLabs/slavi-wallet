import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface CoinFullListElementProps {
  shown: boolean;
  logo?: string;
  type?: string;
  name: string;
  ticker: string;
  onShownChange: () => void;
}

export function CoinFullListElement({shown, onShownChange, logo, type, name, ticker}: CoinFullListElementProps) {
  const [enabled, setEnabled] = useState<boolean>(shown);

  const onEnableChange = useCallback((value: boolean) => {
    setEnabled(value);
    onShownChange();
  }, [onShownChange]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <Image source={getImageSource(logo)} style={styles.logo} />
        <View style={styles.nameColumn}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={styles.tickerColumn}>
          <Text style={styles.ticker} ellipsizeMode={'tail'} numberOfLines={1}>{ticker}</Text>
        </View>
      </View>
      <Switch
        value={enabled}
        onValueChange={onEnableChange}
        thumbColor={theme.colors.white}
        trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.simpleCoinBackground,
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  nameColumn: {
    flexDirection: 'column',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
    maxWidth: Layout.isSmallDevice ? 100 : 150
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
    textTransform: 'uppercase',
    maxWidth: Layout.isSmallDevice ? 70 : 100
  },
  tickerColumn: {
    marginLeft: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  leftColumn: {
    flexDirection: 'row',
  }
});
