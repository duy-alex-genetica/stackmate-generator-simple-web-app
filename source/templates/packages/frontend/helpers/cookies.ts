import jsCookie from "js-cookie";

export enum CookieExpireType {
  OneDay = 1,
  OneWeek = 7,
  OneMonth = 30,
  OneYear = 365,
  FiveYears = 1825,
  TenYears = 3650,
  TwentyYears = 7300,
}

export function setCookie(key: string, value: string, durations: CookieExpireType) {
  const domain = window.location.hostname;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + durations || CookieExpireType.OneDay);
  jsCookie.remove(key, { domain });
  jsCookie.set(key, value, { expires: expiresAt, domain });
}

export function getCookie(key: string) {
  return jsCookie.get(key);
}
