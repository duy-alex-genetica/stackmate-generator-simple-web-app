import { toCamelCaseKeys } from "@/helpers/normalization";
import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from "redux-persist";

interface AuthUser {
  userId: number;
  profileId: number;
  username: string;
  lastLogin: string;
}

export interface AuthState {
  deviceToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessExpiresAt: number | null;
  refreshExpiresAt: number | null;
  user: AuthUser | null;
}

const initialState: AuthState = {
  deviceToken: null,
  accessToken: null,
  refreshToken: null,
  accessExpiresAt: null,
  refreshExpiresAt: null,
  user: null,
};

const processPayload = (payload: any): AuthState => {
  return toCamelCaseKeys((payload ?? {})) as AuthState;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessExpiresAt = null;
      state.refreshExpiresAt = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      if (action.payload?.auth) {
        const {
          accessToken,
          refreshToken,
          accessExpiresAt,
          refreshExpiresAt,
          user
        } = processPayload(action.payload.auth);
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.accessExpiresAt = accessExpiresAt;
        state.refreshExpiresAt = refreshExpiresAt;
        state.user = user;
      }
    });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
