import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendSolanaBasedScreen from './send-solana-based-screen';

export interface SendSolanaScreenProps {
  coin: string;
}

const SendSolanaScreen = (props: SendSolanaScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createSolanaPattern(props.coin, addressService.getGetterDelegate(props.coin));

  return <SendSolanaBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendSolanaScreen;
