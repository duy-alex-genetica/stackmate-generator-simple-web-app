import { defaultNamespaces } from "@/constants/localization";
import { CookieExpireType, setCookie } from "@/helpers/cookies";
import type { FlatNamespace, KeyPrefix, Namespace, TFunction, i18n } from "i18next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { UseTranslationOptions, FallbackNs } from "react-i18next";
import type { $Tuple } from "react-i18next/helpers";

export type ExtendedUseTranslationResponse<Ns extends Namespace, KPrefix> = {
  t: TFunction<Ns, KPrefix>;
  i18n: i18n;
  ready: boolean;
  changeLanguage: (locale: string) => Promise<void>;
};

export function useAppTranslations<
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
): ExtendedUseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const translationsTools = useTranslation(ns ?? defaultNamespaces, options);
  const { language: currentLanguage, changeLanguage } = translationsTools.i18n;

  const changeAppLanguage = useCallback(async (locale: string) => {
    if (locale === currentLanguage) {
      return;
    }
    setCookie("NEXT_LOCALE", locale, CookieExpireType.OneYear);
    await Promise.all([
      changeLanguage(locale),
      router.push({ pathname, query }, asPath, { locale }),
    ]);
  }, [currentLanguage, changeLanguage, router, pathname, query, asPath]);

  // const redirectBasedOnCookie = useCallback(async () => {
  //   const localeCookie = getCookie("NEXT_LOCALE");
  //   if (localeCookie && localeCookie !== currentLanguage) {
  //     await Promise.all([
  //       changeLanguage(localeCookie),
  //       router.push({ pathname, query }, asPath, { locale: localeCookie }),
  //     ]);
  //   }
  // }, [currentLanguage, changeLanguage, router, pathname, query, asPath]);
  //
  // useEffect(() => {
  //   redirectBasedOnCookie().then();
  // }, []);

  return {
    ...translationsTools,
    changeLanguage: changeAppLanguage,
  };
}
