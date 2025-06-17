import { LANG_TH } from "@/constants/i18n";
import { defaultNamespaces } from "@/constants/localization";
import { i18nConfig } from "@/next-i18next.config.cjs";
import { UserConfig, SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerTranslations = async (initialLocale: string | undefined, namespacesRequired?: string[] | undefined, configOverride?: UserConfig | null, extraLocales?: string[] | false): Promise<SSRConfig> => {
  return serverSideTranslations(
    initialLocale ?? LANG_TH,
    namespacesRequired ?? defaultNamespaces,
    i18nConfig,
    extraLocales,
  );
};
