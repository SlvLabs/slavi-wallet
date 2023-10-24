import React, {useCallback, useEffect, useState} from 'react';
import BaseAuthedModal from '../../modal/base-authorized-modal';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../../utils/use-translation';
import theme from '../../../theme';
import SolidButton from '../../buttons/solid-button';
import OutlineButton from '../../buttons/outline-button';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import CryptoAmountText from '../../text/crypto-amount-text';
import SimpleCheckbox from '../../controls/simple-checkbox';
import {nftArrow} from '../../../assets/images';
import Layout from '../../../utils/layout';
import getImageSource from '../../../utils/get-image-source';
import CustomIcon from '../../custom-icon/custom-icon';
import AlertRow from "../../error/alert-row";
import {ModalProps} from "../../modal/base-modal";

export interface ConfirmStakeModalProps extends ModalProps {
  onAccept: () => void;
  amount: string;
  fee?: string;
  ticker: string;
  period: string;
  logo?: string;
  loading: boolean;
  error?: string;
}

const cryptoPrecision = 4;

export function ConfirmStakeModal({
  onAccept,
  fee,
  ticker,
  logo,
  amount,
  period,
  loading,
  error,
  ...modalProps
}: ConfirmStakeModalProps) {
  const [accepted, setAccepted] = useState<boolean>(false);

  const {t} = useTranslation();

  const openTermsOfUse = useCallback(() => {
    Linking.openURL(t('stakingTermOfUseLink')).catch(e => console.error(e));
  }, [t]);

  useEffect(() => setAccepted(false), [modalProps.visible]);

  return (
    <BaseAuthedModal contentStyle={styles.content} {...modalProps} showCloseIcon={true}>
      <Text style={styles.header}>{t('stakingConfirmationHeader')}</Text>
      <View style={styles.stakeBlock}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={getImageSource(logo)} style={styles.logo} />
            <Text style={styles.label}>{t('stakingStake')}</Text>
          </View>
          <CryptoAmountText
            ticker={ticker}
            value={makeRoundedBalance(cryptoPrecision, amount)}
            style={styles.amount}
            tickerStyle={styles.amount}
          />
        </View>
        <View style={styles.delimiterView}>
          <View style={styles.delimiter} />
          <Image source={nftArrow} style={styles.arrow} />
          <View style={styles.delimiter} />
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <CustomIcon name={'time2'} color={theme.colors.textLightGray} size={20} style={styles.clockIcon} />
            <Text style={styles.label}>{t('stakingPeriod')}</Text>
          </View>
          <Text style={styles.amount}>{period}</Text>
        </View>
      </View>
      <View style={styles.txRow}>
        <Text style={styles.feeLabel}>{t('stakingTxFee')}</Text>
        <CryptoAmountText
          ticker={ticker}
          value={makeRoundedBalance(cryptoPrecision, fee)}
          style={styles.fee}
          tickerStyle={styles.fee}
        />
      </View>
      <SimpleCheckbox checked={accepted} onPress={() => setAccepted(!accepted)}>
        <View style={styles.agreementTextView}>
          <Text style={styles.agreementCheckboxLabel}>{t('stakingTermOfStakingAgreement')}</Text>
          <Text style={styles.agreementCheckboxLabelLink} onPress={openTermsOfUse}>
            {t('stakingTermOfStaking')}
          </Text>
        </View>
      </SimpleCheckbox>
      {!!error && <AlertRow text={error} />}
      <SolidButton
        title={t('Ok')}
        onPress={onAccept}
        containerStyle={styles.acceptButton}
        disabled={!accepted}
        loading={loading}
      />
      <OutlineButton title={t('Cancel')} onPress={modalProps.onCancel} containerStyle={styles.cancelButton} />
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25,
    color: theme.colors.white,
  },
  acceptButton: {
    width: '100%',
    marginTop: 24,
  },
  cancelButton: {
    width: '100%',
    marginTop: 10,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
    marginBottom: 24,
    paddingLeft: 0,
    alignItems: 'center',
  },
  feeLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'left',
    flex: 1,
  },
  fee: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
  },
  agreementTextView: {
    marginLeft: 14,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  agreementCheckboxLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.01,
    color: theme.colors.white,
  },
  agreementCheckboxLabelLink: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.01,
    color: theme.colors.green,
  },
  stakeBlock: {
    marginTop: 32,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 10,
  },
  arrow: {
    width: 24,
    height: 24,
  },
  delimiterView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  delimiter: {
    width: Layout.window.width / 2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 12,
    borderRadius: 10,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.textLightGray,
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  },
  clockIcon: {
    marginRight: 10,
  },
});
