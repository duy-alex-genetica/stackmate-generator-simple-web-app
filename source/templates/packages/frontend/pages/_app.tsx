import "@/styles/styles.scss";
import NProgressLoading from "@/components/ui/NProgressLoading";
import { i18nConfig } from "@/next-i18next.config.cjs";
import { persistor, wrappedStore } from "@/store";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import React, { useEffect, useState } from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

function MyApp({ Component, ...rest }: AppProps) {
  const router = useRouter();
  const { store, props } = wrappedStore.useWrappedStore(rest);
  const { session, ...pageProps } = props.pageProps;

  const [routerState, setRouterState] = useState<{
    isRouteChanging: boolean;
    loadingKey: number;
  }>({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setRouterState((prevState) => ({
        isRouteChanging: true,
        loadingKey: prevState.loadingKey + 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setRouterState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NuqsAdapter>
            <NProgressLoading
              isRouteChanging={routerState.isRouteChanging}
              key={routerState.loadingKey}
            />
            <Component {...pageProps} />
          </NuqsAdapter>
        </PersistGate>
      </StoreProvider>
    </>
  );
}

export default appWithTranslation(MyApp, i18nConfig);
