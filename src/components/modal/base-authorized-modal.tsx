import React from 'react';
import {useSelectIsAuthorized} from '@slavi/wallet-core/src/store/modules/auth/selectors';
import BaseModal, {BaseModalProps} from "./base-modal";

const BaseAuthorizedModal = (props: BaseModalProps) => {
  const isAuth = useSelectIsAuthorized();

  return (
    <BaseModal {...props} visible={isAuth && props.visible} />
  );
}

export default BaseAuthorizedModal;
