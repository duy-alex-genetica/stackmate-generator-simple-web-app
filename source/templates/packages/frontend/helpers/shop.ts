import { DEFAULT_CURRENCY } from "@/constants/shop";

export const getPercentSavings = (finalPrice: number, originPrice: number) => {
  return Math.abs(
    Math.round(((finalPrice - originPrice) / originPrice || 1) * 100),
  );
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || DEFAULT_CURRENCY,
  }).format(amount);
};
