import PreparedDecimal, {Decimal80} from '@slavi/wallet-core/src/utils/prepared-decimal';

const makeRoundedBalance = (round: number, balance?: string | number, limit?: string | number): string => {
  if (typeof balance === 'undefined') {
    return '';
  }

  const balanceValue = new PreparedDecimal(balance || 0);
  if (!balanceValue.eq(0) && limit && balanceValue.abs().lessThan(new PreparedDecimal(limit))) {
    return '~0';
  }
  return balanceValue.toDecimalPlaces(round).toString();
};

export const makeFloorBalance = (round: number, balance?: string | number, limit?: string | number): string => {
  if (typeof balance === 'undefined') {
    return '';
  }

  const balanceValue = new Decimal80(balance || 0);
  if (!balanceValue.eq(0) && limit && balanceValue.abs().lessThan(new Decimal80(limit))) {
    return '~0';
  }
  return balanceValue.toDecimalPlaces(round).toString();
};

export default makeRoundedBalance;
