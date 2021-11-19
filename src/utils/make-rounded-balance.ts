import PreparedDecimal from '@slavi/wallet-core/src/utils/prepared-decimal';

const makeRoundedBalance = (
  round: number,
  balance?: string | number,
  limit?: string | number,
): string => {
  if (typeof balance === 'undefined') {
    return '';
  }

  const balanceValue = new PreparedDecimal(balance);
  if(!balanceValue.eq(0) && limit && balanceValue.abs().lessThan(new PreparedDecimal(limit))) {
    return '~0';
  }
  return balanceValue.toDecimalPlaces(round).toString();
};

export default makeRoundedBalance;
