import helperUtil from "@/utils/helper.util";

export default function useCurrency() {
  const locale = Intl.NumberFormat().resolvedOptions().locale;
  const organizationCurrency = 'NGN';

  const formatCurrency = (value: string | number, country?: string) => {
    const currency = country || organizationCurrency;

    const floatValue = helperUtil.convertToNumber(value);

    const formattedCurrency = new Intl.NumberFormat(locale, {
      currencyDisplay: 'narrowSymbol',
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(floatValue);

    return formattedCurrency;
  };

  return { formatCurrency, locale, organizationCurrency };
}
