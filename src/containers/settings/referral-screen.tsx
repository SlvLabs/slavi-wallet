import ScrollableScreen from '../../components/scrollable-screen';
import useTranslation from '../../utils/use-translation';
import {RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Layout from '../../utils/layout';
import {useGetReferralInfo} from '@slavi/wallet-core/src/providers/ws/hooks/referral/use-get-referral-info';
import Spinner from '../../components/spinner';
import {WorkingReferral} from '../../components/referral/working-referral';
import {CampaignStatus} from '@slavi/wallet-core/src/providers/ws/messages/refferal';
import {ProcessingReferral} from '../../components/referral/processing-referral';
import {FinishedReferral} from '../../components/referral/finished-referral';
import {HelpControls} from '../../components/referral/help-controls';

export function ReferralScreen() {
  const [initialized, setInitialized] = useState<boolean>(false);

  const {t} = useTranslation();
  const {isLoading, data, reload} = useGetReferralInfo();

  const content = useMemo(() => {
    if (isLoading || !data) {
      return null;
    } else if (data.campaignStatus === CampaignStatus.active) {
      return (
        <WorkingReferral
          friends={data.referralCount}
          points={data.points}
          invitingCode={data.inviteCode}
          percent={data.referrerPercent}
          invitedCode={data.invitingCode}
          codeLen={data.codeLength}
          rules={data.rules}
        />
      );
    } else if (data.campaignStatus === CampaignStatus.counting) {
      return <ProcessingReferral points={data.points} />;
    } else if (data.campaignStatus === CampaignStatus.done) {
      return <FinishedReferral points={data.points} slvAmount={data.slvReward} token={data.code} />;
    } else {
      return null;
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (initialized) {
      return;
    }

    if (!isLoading && data) {
      setInitialized(true);
    }
  }, [data, initialized, isLoading]);

  return (
    <ScrollableScreen
      title={t('referralTitle')}
      // gradient={theme.gradients.screenReferralBackground}
      gradientStyle={styles.container}
      headerContainerStyle={styles.headerContainer}
      refreshControl={<RefreshControl onRefresh={reload} refreshing={initialized && isLoading} />}
      controls={<HelpControls />}
      backButtonStyle={styles.backButton}
      iconSize={28}>
      {!initialized ? (
        <View style={styles.spinner}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.content}>{content}</View>
      )}
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerContainer: {
    marginBottom: 0,
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingRight: Layout.isSmallDevice ? 8 : 16,
  },
  content: {},
  spinner: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
});
