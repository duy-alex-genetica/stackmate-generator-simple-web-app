import { isClient } from "@/helpers/env";

export const reactNativeShare = async (uri: string) => {
  if (isClient() && window?.LifeAIBridge) {
    window.LifeAIBridge.shareLink(uri);
  }
}

export const reactNativeWithdraw = async () => {
  if (isClient() && window?.LifeAIBridge) {
    window.LifeAIBridge.onWithdraw();
  }
}
