const DEFAULT_BEGIN_LETTERS_COUNT = 10;
const DEFAULT_END_LETTERS_COUNT = 10;
const DEFAULT_MAX_LENGTH = 35;

export default function shrinkAddress (
  address: string,
  beginLettersCount?: number,
  endLettersCount?: number,
  maxLettersLength?: number,
) {
  const beginCount = beginLettersCount || DEFAULT_BEGIN_LETTERS_COUNT;
  const endCount = endLettersCount || DEFAULT_END_LETTERS_COUNT;
  const maxLength = maxLettersLength || DEFAULT_MAX_LENGTH;

  if(address.length <= maxLength) {
    return address;
  }

  return `${address.slice(0, beginCount)}...${address.slice(-endCount)}`;
}
