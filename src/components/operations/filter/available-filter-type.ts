import OperationType from '@slavi/wallet-core/src/utils/operation-list/operation-type';
import {TranslationsKey} from '../../../utils/use-translation';

interface AvailableFilter {
  id: OperationType,
  text: TranslationsKey,
}

export const availableType: AvailableFilter[] = [
  {id: OperationType.send, text: 'filterWithdrawal'},
  {id: OperationType.recv, text: 'filterDeposit'},
  {id: OperationType.swap, text: 'filterSwap'},
  {id: OperationType.contractCall, text: 'filterCall'},
  {id: OperationType.approveCall, text: 'filterApprove'},
  {id: OperationType.commission, text: 'filterCommission'},
  {id: OperationType.nftRecv, text: 'filterNftDeposit'},
  {id: OperationType.nftSend, text: 'filterNftSend'},
  {id: OperationType.burn, text: 'filterBurn'},
];
