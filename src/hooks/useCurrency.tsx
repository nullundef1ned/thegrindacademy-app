import helperUtil from "@/utils/helper.util";

export default function useCurrency() {
  const locale = Intl.NumberFormat().resolvedOptions().locale;
  const organizationCurrency = 'NGN';

  const formatCurrency = (value: string | number, country?: string, truncate: boolean = false) => {
    const currency = country || organizationCurrency;

    const floatValue = helperUtil.convertToNumber(value);

    const formattedCurrency = new Intl.NumberFormat(locale, {
      currencyDisplay: 'narrowSymbol',
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(floatValue);

    if (floatValue >= 1000 && truncate) {
      const suffixes = ['', 'K', 'M', 'B'];
      const suffixNum = Math.floor(Math.log10(Math.abs(floatValue)) / 3);
      const shortValue = (floatValue / Math.pow(1000, suffixNum));

      const formatted = new Intl.NumberFormat(locale, {
        currencyDisplay: 'narrowSymbol',
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(shortValue);

      return formatted + suffixes[suffixNum];
    }

    return formattedCurrency;
  };

  return { formatCurrency, locale, organizationCurrency };
}
