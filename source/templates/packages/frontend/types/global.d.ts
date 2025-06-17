declare global {
  interface Window {
    PUBLIC_CONFIG: Record<string, any>;
    CURRENT_LANG: string;
    i18n: any;
    ReactNativeWebView: any;
    LifeAIBridge: {
      versionManagement: any;
      accessToken: any;
      userProfile: any;
      makePayment: (data: any) => void;
      shareLink: (uri: string) => void;
      onWithdraw
    };
  }
}

export {};
