import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MoreRecipientElement from './more-recipient-element';
import OpeningButton from '../buttons/opening-button';
import useTranslation from '../../utils/use-translation';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface MoreRecipientInfoProps {
  recipients: {
    address: string;
    amount: string;
  }[];
  ticker: string;
  logo?: string;
}

export default function MoreRecipientInfo({recipients, ticker, logo}: MoreRecipientInfoProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <OpeningButton opened={opened} title={t('moreRecipients')}  onPress={() => setOpened(!opened)} />
      <View style={styles.content}>
        {opened && recipients.map((recipient, i) => (
          <MoreRecipientElement
            ticker={ticker}
            logo={logo}
            address={recipient.address}
            amount={makeRoundedBalance(4, recipient.amount)}
            key={`recipient_${i}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  content: {
    marginTop: 9,
  },
});
