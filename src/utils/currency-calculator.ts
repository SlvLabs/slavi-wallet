import PreparedDecimal from '@slavi/wallet-core/src/utils/prepared-decimal';

export function getCryptoAmountByCurrencyAmountAndPrice(currencyAmount: string, price?: string): string {
  if (typeof price === 'undefined') {
    return '0';
  }
  return new PreparedDecimal(currencyAmount || '0').div(new PreparedDecimal(price)).toDecimalPlaces(8).toString();
}

export function getCurrencyAmountByCryptoAmountAndPrice(cryptoAmount: string, price?: string): string {
  if (typeof price === 'undefined') {
    return '0';
  }
  return new PreparedDecimal(price)
    .mul(new PreparedDecimal(cryptoAmount || '0'))
    .toDecimalPlaces(4)
    .toString();
}
