import { AuthState } from "@/store/features/authentication";
import { UIState } from "@/store/features/uiState";

export type RootState = {
  auth: AuthState;
  ui: UIState;
};
