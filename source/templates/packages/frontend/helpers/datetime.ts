import { DateTime } from "luxon";

export const getSubmittedAtGMT7 = (): string => {
  return DateTime.now().setZone("Asia/Bangkok").toFormat("yyyy-MM-dd HH:mm:ss 'GMT'ZZ");
};
