import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import InitializationBackground from '../../components/background/initialization-background';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import {useTranslation} from 'react-i18next';
import SimpleCheckbox from '../../components/controls/simple-checkbox';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ScrollableArea from '../../components/controls/scrollable-area';
import {useDispatch} from 'react-redux';
import { save } from '@slavi/wallet-core/src/store/modules/initialization/initialization-thunk-actions';

const userAgreementText = 'All statements contained in this White Paper, statements made in press releases or in any place accessible by the public and oral statements that may be made by SLAVI APPLICATION and/or the Distributor or their respective directors, executive officers or employees acting on behalf of SLAVI APPLICATION or the Distributor (as the case may be), that are not statements of historical fact, constitute “forward- looking statements”. Some of these statements can be identified by forward-looking terms such as “aim”, “target”, “anticipate”, “believe”, “could”, “estimate”, “expect”, “if”, “intend”, “may”, “plan”, “possible”, “probable”, “project”, “should”, “would”, “will” or other similar terms. However, these terms are not the exclusive means of identifying forward-looking statements. All statements regarding SLAVI APPLICATION’s and/or the Distributor’s financial position, business strategies, plans and prospects and the future prospects of the industry which SLAVI APPLICATION and/or the Distributor is in are forward-looking statements. These forward-looking statements, including but not limited to statements as to SLAVI APPLICATION’s and/or the Distributor’s revenue and profitability, prospects, future plans, other expected industry trends and other matters discussed in this White Paper regarding SLAVI APPLICATION and/or the Distributor are matters that are not historic facts, but. All statements contained in this White Paper, statements made in press releases or in any place accessible by the public and oral statements that may be made by SLAVI APPLICATION and/or the Distributor or their respective directors, executive officers or employees acting on behalf of SLAVI APPLICATION or the Distributor (as the case may be), that are not statements of historical fact, constitute “forward- looking statements”. Some of these statements can be identified by forward-looking terms such as “aim”, “target”, “anticipate”, “believe”, “could”, “estimate”, “expect”, “if”, “intend”, “may”, “plan”, “possible”, “probable”, “project”, “should”, “would”, “will” or other similar terms. However, these terms are not the exclusive means of identifying forward-looking statements. All statements regarding SLAVI APPLICATION’s and/or the Distributor’s financial position, business strategies, plans and prospects and the future prospects of the industry which SLAVI APPLICATION and/or the Distributor is in are forward-looking statements. These forward-looking statements, including but not limited to statements as to SLAVI APPLICATION’s and/or the Distributor’s revenue and profitability, prospects, future plans, other expected industry trends and other matters discussed in this White Paper regarding SLAVI APPLICATION and/or the Distributor are matters that are not historic facts, but. All statements contained in this White Paper, statements made in press releases or in any place accessible by the public and oral statements that may be made by SLAVI APPLICATION and/or the Distributor or their respective directors, executive officers or employees acting on behalf of SLAVI APPLICATION or the Distributor (as the case may be), that are not statements of historical fact, constitute “forward- looking statements”. Some of these statements can be identified by forward-looking terms such as “aim”, “target”, “anticipate”, “believe”, “could”, “estimate”, “expect”, “if”, “intend”, “may”, “plan”, “possible”, “probable”, “project”, “should”, “would”, “will” or other similar terms. However, these terms are not the exclusive means of identifying forward-looking statements. All statements regarding SLAVI APPLICATION’s and/or the Distributor’s financial position, business strategies, plans and prospects and the future prospects of the industry which SLAVI APPLICATION and/or the Distributor is in are forward-looking statements. These forward-looking statements, including but not limited to statements as to SLAVI APPLICATION’s and/or the Distributor’s revenue and profitability, prospects, future plans, other expected industry trends and other matters discussed in this White Paper regarding SLAVI APPLICATION and/or the Distributor are matters that are not historic facts, but';

const LicenseAgreementScreen = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const goNextStep = useCallback(() => dispatch(save()), [dispatch]);

  return (
    <InitializationBackground>
      <Text style={styles.header}>{t('User agreement')}</Text>
      <ScrollableArea text={t(userAgreementText)} containerStyle={styles.license}/>
      <View style={styles.agreementView}>
        <SimpleCheckbox
          label={t('I accept the terms of the user agreement')}
          checked={accepted}
          onPress={() => setAccepted(!accepted)}
        />
      </View>
      <SolidButton title={t('Continue')} onPress={goNextStep} disabled={!accepted}/>
      <View style={styles.loaderView}>
        <PointerProgressBar stepsCount={5} activeStep={1}/>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  loaderView: {
    paddingTop: 17,
  },
  header: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  license: {
    marginBottom: 20,
  },
  agreementView: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LicenseAgreementScreen;
