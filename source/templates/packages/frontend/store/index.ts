import features from '@/store/features';
import { rootApi } from '@/store/services';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  ...features,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'ui'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([rootApi.middleware]),
});

export const wrappedStore = createWrapper(() => store, { debug: process.env.NODE_ENV === 'development' });

export const persistor = persistStore(store);
