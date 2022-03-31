import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import React, {useCallback, useMemo} from 'react';
import {Clipboard} from '@react-native-community/clipboard/dist/Clipboard';
import Toast from 'react-native-simple-toast';
import useTranslation from '../../utils/use-translation';

export interface TxMetaInfoProps {
  contract: string;
  fee: string;
  contractLabel: string;
  feeLabel: string;
}

export default function TxMetaInfo(props: TxMetaInfoProps) {
  const {contract, contractLabel, fee, feeLabel} = props;

  const {t} = useTranslation();

  const address = useMemo(() => `${contract.slice(0,6)}...${contract.slice(-4)}`, [contract]);

  const copy = useCallback(() => {
    Clipboard.setString(contract);
    Toast.show(t('Copied to clipboard'))
  }, [contract]);

  return (
    <View style={styles.container}>
      <View style={styles.contractRow}>
        <Text style={styles.label}>{contractLabel}</Text>
        <TouchableOpacity style={styles.addressBlock} onPress={copy}>
          <Text style={styles.addressText}>{address}</Text>
          <CustomIcon name={'copy'} size={12} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.feeRow}>
        <Text style={styles.label}>{feeLabel}</Text>
        <Text style={styles.feeText}>{fee}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  contractRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.lightGray,
    alignSelf: 'center',
  },
  addressBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.borderGreen,
    alignSelf: 'center',
    marginRight: 10,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.lightGray,
    alignSelf: 'center',
  },
});
