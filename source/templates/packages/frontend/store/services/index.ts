import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiEndpoints from "store/services/appApi";

export enum TagTypes {
}

export const rootApi = createApi({
  reducerPath: '$api',
  tagTypes: Object.values(TagTypes),
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
});

const appApi = rootApi.injectEndpoints({ endpoints: apiEndpoints });

export const {
} = appApi;
