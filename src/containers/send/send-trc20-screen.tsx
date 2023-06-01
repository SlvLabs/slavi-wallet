import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendTronBasedScreen from './send-tron-based-screen';

export interface SendEthScreenProps {
  coin: string;
}

const SendTrc20Screen = (props: SendEthScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createTrc20Pattern(props.coin, addressService.getGetterDelegate(props.coin));

  return <SendTronBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendTrc20Screen;
