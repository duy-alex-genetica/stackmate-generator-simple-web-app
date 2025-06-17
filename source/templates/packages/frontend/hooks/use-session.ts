import { isClient } from "@/helpers/env";
import { useMemo } from "react";

type LifeAIBridgeType = {
  versionManagement: string;
  accessToken: string;
  refCodeMiniApp?: string;
  userProfile: {
    user_profile_id: string;
    life_app_ref_code: string | null;
    life_app_personal_ref_code: string | null;
    life_app_personal_ref_deep_link: string | null;
    membership: string | null;
    activation_date_membership: string | null;
    activation_start_date_membership: string | null;
    ranking: Record<string, unknown>;
    total_profit: string | null;
    name: string;
    avatar: string | null;
    has_been_membership: boolean;
    is_reviewer: boolean;
    id: string;
    phone: string;
    email: string;
    address: string | null
    gender: number;
    dob: string | null;
    phone_country_code: string;
    phone_national_number: string;
    language: string;
  }
}

export default function useSession(): {
  lifeAIBridge: LifeAIBridgeType;
  isAuthenticated: boolean;
} {
  const isAuthenticated = useMemo(() => isClient() && Boolean(window?.LifeAIBridge?.accessToken), [window?.LifeAIBridge?.accessToken]);
  // const isAuthenticated = true;

  return {
    lifeAIBridge: window?.LifeAIBridge,
    isAuthenticated,
  }
}
