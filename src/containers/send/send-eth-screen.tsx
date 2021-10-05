import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendEthBasedScreen from './send-eth-based-screen';

export interface SendEthScreenProps {
  coin: string;
}

const SendEthScreen = (props: SendEthScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createEthPattern(
    props.coin,
    addressService.getGetterDelegate(props.coin),
  );

  // @ts-ignore
  return <SendEthBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendEthScreen;
