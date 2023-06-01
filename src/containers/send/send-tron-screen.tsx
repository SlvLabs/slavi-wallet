import React from 'react';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import SendTronBasedScreen from './send-tron-based-screen';

export interface SendTronScreenProps {
  coin: string;
}

const SendTronScreen = (props: SendTronScreenProps) => {
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = coinPatternService.createTronPattern(props.coin, addressService.getGetterDelegate(props.coin));

  return <SendTronBasedScreen coin={props.coin} pattern={pattern} />;
};

export default SendTronScreen;
