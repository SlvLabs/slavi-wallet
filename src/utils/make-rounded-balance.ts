import Decimal from 'decimal.js';

const makeRoundedBalance = (
  round: number,
  balance?: string | number,
): string => {
  if (typeof balance === 'undefined') {
    return '';
  }

  const balanceValue = new Decimal(balance);
  return balanceValue.toDecimalPlaces(round).toString();
};

export default makeRoundedBalance;
