import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendEthBasedScreen from './send-eth-based-screen';

export interface SendEthScreenProps {
  coin: string;
}

const SendErc20Screen = (props: SendEthScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createErc20Pattern(props.coin, addressService.getGetterDelegate(props.coin));

  return <SendEthBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendErc20Screen;
