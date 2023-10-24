import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import CoinsSelectModal from '../coins/coins-select-modal';
import CustomIcon from '../custom-icon/custom-icon';
import {CoinListElementData} from '../coins/coins-select-list';
import makeRoundedBalance from "../../utils/make-rounded-balance";

export interface DestinationCoinElementProps {
  ticker: string;
  amount: string;
  balance?: string;
  onCoinSelect: (coinId: string) => void;
  coins: CoinListElementData[];
  logo?: string;
  containerStyle?: ViewStyle;
}

export default function DestinationCoinElement(props: DestinationCoinElementProps) {
  const {
    ticker,
    logo,
    amount,
    containerStyle,
    coins,
    onCoinSelect,
    balance,
  } = props;

  const [coinModalShown, setCoinModalIsShown] = useState<boolean>(false);

  const {t} = useTranslation();

  const showCoinModal = useCallback(() => setCoinModalIsShown(true), []);
  const hideCoinModal = useCallback(() => setCoinModalIsShown(false), []);

  const _onCoinSelect = useCallback((coin: CoinListElementData) => {
    onCoinSelect(coin.id);
    hideCoinModal();
  }, [onCoinSelect, hideCoinModal]);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>{t('youReceive')}</Text>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.balanceLabel}>{`${t('balance')}: ${makeRoundedBalance(6, balance ?? 0)} ${ticker}`}</Text>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity style={styles.row} onPress={showCoinModal}>
          <Image source={getImageSource(logo)} style={styles.image}/>
          <Text style={styles.ticker}>{ticker}</Text>
          <CustomIcon name={'arrow-right1'} size={8} color={theme.colors.textLightGray1}/>
        </TouchableOpacity>
      </View>
      <CoinsSelectModal
        coins={coins}
        onElementPress={_onCoinSelect}
        balanceShown={false}
        visible={coinModalShown}
        onCancel={hideCoinModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
  },
  balanceLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  maxText: {},
  image: {
    width: 32,
    height: 32,
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 12,
    marginRight: 12,
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.white,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
