export enum Genders {
  MALE = 1,
  FEMALE = 2,
  ANOTHER = 3,
}

export const NotificationTypes = {
  NOTI_WITHDRAW_SUCCESS: 'withdraw_success',
  NOTI_WITHDRAW_FAILED: 'withdraw_failed',
  NOTI_PAYMENT_SUCCESS: 'payment_success',
  NOTI_PAYMENT_VIP_SUCCESS: 'payment_vip_success',
  NOTI_PAYMENT_PRODUCT_SUCCESS: 'payment_product_success',
  NOTI_RATIO_UPDATE: 'distribution_ratio_updated',
  NOTI_INVITE_SUCCESS: 'invite_success',
  NOTI_FRIEND_EXTENDED: 'friend_extended_vip',
  NOTI_SECRET_CODE_CHANGED: 'secret_code_changed',
  NOTI_SYSTEM_MESSAGE: 'system_message',
  NOTI_PAYMENT_FAILED: 'payment_product_failed',
  NOTI_ADJUSTMENT_SERVICE_DISCOUNT: 'adjustment_service_discount',
};

export const Platform = {
  WEB: 'web',
}
