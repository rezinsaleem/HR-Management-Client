import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import hrAuthSlice from './slices/hrSlice';


const hrPersistConfig = { key: 'hrAuth', storage, version: 1 };

const hrAuthPersistReducer = persistReducer(
  hrPersistConfig,
  hrAuthSlice.reducer
);

export const store = configureStore({
  reducer: {
    hr: hrAuthPersistReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middleware;
  },
});

export const persistor = persistStore(store);