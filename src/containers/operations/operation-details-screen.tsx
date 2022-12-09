import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import ScrollableScreen from '../../components/scrollable-screen';
import {useOperationDetails} from '@slavi/wallet-core/src/providers/ws/hooks/use-operation-details';
import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import Spinner from '../../components/spinner';
import {useRoute} from '@react-navigation/native';
import {OperationDetailsRouteProps} from '../../navigation/OperationsStack';
import {OperationDeposit} from '../../components/operation-info/operation-deposit';
import {OperationWithdrawal} from '../../components/operation-info/operation-withdrawal';
import {OperationSwap} from '../../components/operation-info/operation-swap';
import {OperationBurn} from '../../components/operation-info/operation-burn';
import {OperationNftDeposit} from '../../components/operation-info/operation-nft-deposit';
import {OperationNftWithdrawal} from '../../components/operation-info/operation-nft-withdrawal';
import {OperationCall} from '../../components/operation-info/operation-call';
import {OperationApproveCall} from '../../components/operation-info/operation-approve-call';
import {OperationSpecificPolkadot} from '../../components/operation-info/operation-specific-polkadot';
import {OperationNftTransfer} from '../../components/operation-info/operation-nft-transfer';
import {OperationEarnDeposit} from '../../components/operation-info/operation-earn-deposit';
import {OperationEarnWithdraw} from '../../components/operation-info/operation-earn-withdraw';
import {OperationEarnPayment} from '../../components/operation-info/operation-earn-payment';

const titleByType: Record<OperationType, TranslationsKey> = {
  [OperationType.recv]: 'depositScreenHeader',
  [OperationType.send]: 'withdrawalScreenHeader',
  [OperationType.nftSend]: 'nftWithdrawalScreenHeader',
  [OperationType.nftRecv]: 'nftDepositScreenHeader',
  [OperationType.nftRecvMulti]: 'nftDepositMultiScreenHeader',
  [OperationType.nftSendMulti]: 'nftWithdrawalMultiScreenHeader',
  [OperationType.nftTransfer]: 'nftTransferScreenHeader',
  [OperationType.swap]: 'swapScreenHeader',
  [OperationType.burn]: 'burnScreenHeader',
  [OperationType.contractCall]: 'callScreenHeader',
  [OperationType.approveCall]: 'approveCallScreenHeader',
  [OperationType.polkadotExchange]: 'polkadotExchange',
  [OperationType.polkadotInvest]: 'polkadotInvest',
  [OperationType.polkadotInvesttolock]: 'polkadotInvesttolock',
  [OperationType.polkadotLocktofree]: 'polkadotLocktofree',
  [OperationType.polkadotReserved]: 'polkadotReserved',
  [OperationType.polkadotReward]: 'polkadotReward',
  [OperationType.commission]: 'polkadotCommission',
  [OperationType.stakingWallet]: 'walletInvest',
  [OperationType.stakingWalletDeposit]: 'stakingWalletDeposit',
  [OperationType.stakingWalletReturn]: 'stakingWalletWithdraw',
  [OperationType.stakingWalletReward]: 'stakingWalletReward',
};

export function OperationDetailsScreen() {
  const [title, setTitle] = useState<string>('');
  const route = useRoute<OperationDetailsRouteProps>();
  const id = route.params?.id;
  const {t} = useTranslation();

  const {isLoading, operation} = useOperationDetails(id);

  useEffect(() => {
    if (!isLoading && operation) {
      setTitle(t(titleByType[operation.type]));
    }
  }, [isLoading, operation, t]);

  const content = useMemo(() => {
    switch (operation?.type) {
      case OperationType.recv:
        return <OperationDeposit operation={operation} />;
      case OperationType.send:
        return <OperationWithdrawal operation={operation} />;
      case OperationType.swap:
        return <OperationSwap operation={operation} />;
      case OperationType.commission:
      case OperationType.burn:
        return <OperationBurn operation={operation} />;
      case OperationType.nftRecv:
        return <OperationNftDeposit operation={operation} />;
      case OperationType.nftSend:
        return <OperationNftWithdrawal operation={operation} />;
      case OperationType.nftTransfer:
      case OperationType.nftSendMulti:
      case OperationType.nftRecvMulti:
        return <OperationNftTransfer operation={operation} />;
      case OperationType.contractCall:
        return <OperationCall operation={operation} />;
      case OperationType.approveCall:
        return <OperationApproveCall operation={operation} />;
      case OperationType.polkadotLocktofree:
      case OperationType.polkadotInvest:
      case OperationType.polkadotInvesttolock:
      case OperationType.polkadotReserved:
      case OperationType.polkadotReward:
        return <OperationSpecificPolkadot operation={operation} />;
      case OperationType.stakingWalletDeposit:
        return <OperationEarnDeposit operation={operation} />;
      case OperationType.stakingWalletReturn:
        return <OperationEarnWithdraw operation={operation} />;
      case OperationType.stakingWalletReward:
        return <OperationEarnPayment operation={operation} />;
      default:
        return null;
    }
  }, [operation]);

  return isLoading ? (
    <View style={styles.spinnerContainer}>
      <Spinner />
    </View>
  ) : (
    <ScrollableScreen title={title} contentStyle={styles.container}>
      {content}
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  spinnerContainer: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
