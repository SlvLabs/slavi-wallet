import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';

export interface CoinListElementSoonProps {
  logo: string;
  name: string;
  ticker: string;
  type?: string;
}
const CoinListElementSoon = (props: CoinListElementSoonProps) => {
  const {logo, name, ticker, type} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={getImageSource(logo)}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={styles.logoPlaceholder}
        />
      </View>
      <View style={styles.col1}>
        <View style={styles.nameTypeContainer}>
          <Text style={styles.name}>{name}</Text>
          {!!type && <Text style={styles.type}>{type}</Text>}
        </View>
        <View style={styles.underNameRow}>
          <Text style={styles.ticker}>{ticker}</Text>
        </View>
      </View>
      <View style={styles.col2}>
        <Text style={styles.name}>{t('In progress')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.mediumTransparent,
    backgroundColor: 'transparent',
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
  },
  logo: {
    width: 36,
    height: 36,
  },
  col1: {
    justifyContent: 'center',
    flex: 1,
  },
  col2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center'
  },
  logoPlaceholder: {
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.whiteOpacity,
    textAlignVertical: 'bottom',
  },
  ticker: {
    flexDirection: 'row',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.hardTransparent,
    textAlignVertical: 'bottom',
  },
  underNameRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameTypeContainer: {
    flexDirection: 'row',
  },
  type: {
    marginLeft: 8,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 16,
    color: theme.colors.textLightGray1,
    textTransform: 'uppercase',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});

export default CoinListElementSoon;
