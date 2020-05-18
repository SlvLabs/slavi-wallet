import React from 'react';
import {useTranslation} from 'react-i18next';
import FullFilterSection from './full-filter-section';
import FullFilterAddressInput from './full-filter-address-input';

export interface FullFilterAddressSectionProps {
  onAddressChange: (address?: string) => void;
  address?: string;
}

const FullFilterAddressSection = (props: FullFilterAddressSectionProps) => {
  const {address, onAddressChange} = props;

  const {t} = useTranslation();

  return (
    <FullFilterSection title={t('Address')}>
      <FullFilterAddressInput address={address} onChange={onAddressChange} />
    </FullFilterSection>
  );
};

export default FullFilterAddressSection;
