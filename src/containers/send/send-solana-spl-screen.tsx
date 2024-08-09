import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendSolanaBasedScreen from './send-solana-based-screen';

export interface SendSolanaSplScreenProps {
  coin: string;
}

const SendSolanaSplScreen = (props: SendSolanaSplScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createSolSplPattern(props.coin, addressService.getGetterDelegate(props.coin));

  return <SendSolanaBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendSolanaSplScreen;
