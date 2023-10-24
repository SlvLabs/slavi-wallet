import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import SolidButton from '../buttons/solid-button';
import CoinsSelectModal from '../coins/coins-select-modal';
import DecimalInput, {DecimalType} from '../controls/decimal-input';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import {CoinListElementData} from '../coins/coins-select-list';

export interface SourceCoinElementProps {
  balance: string;
  ticker: string;
  amount: string;
  onAmountChange: (amount: string) => void;
  onCoinSelect: (coinId: string) => void;
  coins: CoinListElementData[];
  logo?: string;
  containerStyle?: ViewStyle;
}

export default function SourceCoinElement(props: SourceCoinElementProps) {
  const {balance, ticker, logo, containerStyle, onAmountChange, amount, coins, onCoinSelect} = props;

  const [coinModalShown, setCoinModalIsShown] = useState<boolean>(false);

  const {t} = useTranslation();

  const showCoinModal = useCallback(() => setCoinModalIsShown(true), []);
  const hideCoinModal = useCallback(() => setCoinModalIsShown(false), []);

  const onMaxPress = useCallback(() => onAmountChange(balance), [balance, onAmountChange]);

  const _onCoinSelect = useCallback(
    (coin: CoinListElementData) => {
      onCoinSelect(coin.id);
      hideCoinModal();
    },
    [onCoinSelect, hideCoinModal],
  );

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>{t('youPay')}</Text>
        <DecimalInput
          value={amount}
          onChange={onAmountChange}
          inputType={DecimalType.Real}
          errorContainerStyle={styles.errorInput}
          disableErrorStyle={true}
          inputContainerStyle={styles.srcInput}
        />
        <Text style={styles.balanceLabel}>{`${t('balance')}: ${makeRoundedBalance(6, balance)} ${ticker}`}</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.row}>
          <SolidButton
            onPress={onMaxPress}
            gradient={theme.gradients.activeIcon}
            title={t('max')}
            titleStyle={styles.maxText}
            containerStyle={styles.maxButton}
            buttonStyle={styles.maxButton}
          />
          <TouchableOpacity style={styles.coinsRow} onPress={showCoinModal}>
            <Image source={getImageSource(logo)} style={styles.image} />
            <Text style={styles.ticker}>{ticker}</Text>
            <CustomIcon name={'arrow-right1'} size={8} color={theme.colors.textLightGray1} />
          </TouchableOpacity>
        </View>
      </View>
      <CoinsSelectModal
        coins={coins}
        onElementPress={_onCoinSelect}
        balanceShown={true}
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
  maxText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  maxButton: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 6,
  },
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
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: theme.colors.white,
  },
  coinsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorInput: {
    display: 'none',
  },
  srcInput: {
    paddingLeft: 0,
    marginRight: 10,
  },
});
