export default function mapArrayToSelectOptions(items: string[] | undefined) {
  if(!items) {
    return {};
  }

  return items?.reduce((acc: Record<string, string>, element) => {
      acc[element] = element;
      return acc;
    }, {});
};
