import { ErrorCodes5xx, errorDefaultMessage } from "@/constants/errors";
import { LANG_EN } from "@/constants/i18n";
import { isClient, env } from "@/helpers/env";
import { findFirstKey } from "@/helpers/parser";
import { toast } from "@/hooks/use-toast";
import { resetAuthState } from "@/store/features/authentication";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const extractResultStatus = (result: any) => {
  return parseInt(result?.error?.status || result?.error?.originalStatus);
}

export const createBaseQuery = (): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const locale = (typeof window !== 'undefined' && window.CURRENT_LANG) || LANG_EN;

  const baseQuery = fetchBaseQuery({
    baseUrl: env('NEXT_PUBLIC_LIFE_API_URL'),
    prepareHeaders: (headers: Headers, { getState }: any) => {
      headers.set('accept-language', locale);

      if (isClient()) {
        headers.set('client_type', (window?.LifeAIBridge?.versionManagement ?? "").split("|")?.[1] ?? 'web');
        headers.set('version-management', window?.LifeAIBridge?.versionManagement ?? '1.0.20|web');
        const accessToken = window?.LifeAIBridge?.accessToken ?? "";

        if(accessToken) {
          headers.set('Authorization', `Token ${accessToken}`);
        }
      }

      return headers;
    },
  });

  {/*// @ts-ignore*/}
  const enhancedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    try {
      const result = await baseQuery(args, api, extraOptions);

      const statusCode = extractResultStatus(result);

      {/*// @ts-ignore*/
      }
      if (result.error && ErrorCodes5xx.includes(statusCode)) {
        toast({
          title: findFirstKey(result.error, 'message') || findFirstKey(result.error, 'error') || window?.i18n?.t("common:errors.default", {
            defaultValue: errorDefaultMessage
          }),
          variant: "destructive",
          className: "p-3"
        });
      }

      if (result.error && statusCode === 401) {
        api.dispatch(resetAuthState());
      }

      return result;
      // return {
      //   data: {
      //   }
      // };
    } catch (error) {
      return { error: { status: 'ERROR', statusText: 'An unexpected error occurred.' } };
    }
  };
  return enhancedBaseQuery;
};
