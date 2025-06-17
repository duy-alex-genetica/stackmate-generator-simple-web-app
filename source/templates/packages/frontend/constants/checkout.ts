export const paymentType = {
    stripe: 'stripe',
    nowPayment: 'nowpayment',
    onepay_atm: 'ATM',
    onepay_credit_debit: 'CREDIT_DEBIT',
    moonpay: 'MOONPAY',
    alchemypay: 'alchemypay',
  };
export const PAYMENT_STATUS_CALLBACK_SUCCESS = "1"
export const PAYMENT_STATUS_CALLBACK_FAILED = "0"

export const paymentStatus = {
  NEW: 0,
  PAID: 1,
  PAYMENT_CANCELLED: 2,
  PAYMENT_FAILED: 3,
  CANCELLED: 4,
  CANCELED_FORM_PAY_GATE: 8,
};

export const vietnamCountryId = 221;