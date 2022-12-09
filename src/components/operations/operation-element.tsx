import React from 'react';
import {ViewStyle} from 'react-native';
import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import {ListOperation} from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import OperationFee from './operation-fee';
import OperationElementDeposit from './operation-element-deposit';
import OperationElementWithdraw from './operation-element-withdraw';
import {OperationElementNftWithdrawal} from './operation-element-nft-withdrawal';
import {OperationElementNftDeposit} from './operation-element-nft-deposit';
import {OperationElementCall} from './operation-element-call';
import OperationElementSwap from './operation-element-swap';
import {OperationElementNftWithdrawalMulti} from './operation-element-nft-withdrawal-multi';
import {OperationElementNftDepositMulti} from './operation-element-nft-deposit-multi';
import {OperationElementNftTransfer} from './operation-element-nft-transfer';
import {OperationElementApproveCall} from './operation-element-approve-call';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import OperationElementPolkadotReward from './operation-element-polkadot-reward';
import OperationElementPolkadotReserved from './operation-element-polkadot-reserved';
import OperationElementPolkadotInvestToLock from './operation-element-polkadot-invest-to-lock';
import OperationElementPolkadotLockToFree from './operation-element-polkadot-lock-to-free';
import OperationElementPolkadotInvest from './operation-element-polkadot-invest';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {OperationElementEarnDeposit} from "./operation-element-earn-deposit";
import {OperationElementEarnWithdraw} from "./operation-element-earn-withdraw";
import {OperationElementEarnPayment} from "./operation-element-earn-payment";

export interface OperationElementProps {
  operation: ListOperation;
  containerStyle?: ViewStyle;
}

export interface OperationProps extends OperationElementProps {
  onPress: () => void;
}

const OperationElement = (props: OperationElementProps) => {
  const navigation = useNavigation();
  const coinData = useCoinDetails(props.operation.coin);

  const onPress = () => {
    navigation.navigate(ROUTES.OPERATIONS.DETAILS, {id: props.operation.id});
  };

  if (!coinData?.id) {
    return null;
  }

  switch (props.operation.type) {
    case OperationType.recv:
      return <OperationElementDeposit {...props} onPress={onPress} />;
    case OperationType.send:
      return <OperationElementWithdraw {...props} onPress={onPress} />;
    case OperationType.burn:
      return <OperationFee {...props} onPress={onPress} />;
    case OperationType.swap:
      return <OperationElementSwap {...props} onPress={onPress} />;
    case OperationType.contractCall:
      return <OperationElementCall {...props} onPress={onPress} />;
    case OperationType.approveCall:
      return <OperationElementApproveCall {...props} onPress={onPress} />;
    case OperationType.nftRecv:
      return <OperationElementNftDeposit {...props} onPress={onPress} />;
    case OperationType.nftSend:
      return <OperationElementNftWithdrawal {...props} onPress={onPress} />;
    case OperationType.nftSendMulti:
      return <OperationElementNftWithdrawalMulti {...props} onPress={onPress} />;
    case OperationType.nftRecvMulti:
      return <OperationElementNftDepositMulti {...props} onPress={onPress} />;
    case OperationType.nftTransfer:
      return <OperationElementNftTransfer {...props} onPress={onPress} />;
    case OperationType.commission:
      return <OperationFee {...props} onPress={onPress} />;
    case OperationType.polkadotReward:
      return <OperationElementPolkadotReward {...props} onPress={onPress} />;
    case OperationType.polkadotReserved:
      return <OperationElementPolkadotReserved {...props} onPress={onPress} />;
    case OperationType.polkadotLocktofree:
      return <OperationElementPolkadotLockToFree {...props} onPress={onPress} />;
    case OperationType.polkadotInvesttolock:
      return <OperationElementPolkadotInvestToLock {...props} onPress={onPress} />;
    case OperationType.polkadotInvest:
      return <OperationElementPolkadotInvest {...props} onPress={onPress} />;
    case OperationType.stakingWalletDeposit:
      return <OperationElementEarnDeposit {...props} onPress={onPress} />;
    case OperationType.stakingWalletReturn:
      return <OperationElementEarnWithdraw {...props} onPress={onPress} />;
    case OperationType.stakingWalletReward:
      return <OperationElementEarnPayment {...props} onPress={onPress} />;
    default:
      return null;
  }
};

export default OperationElement;
