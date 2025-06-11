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

import candidateSlice from './slices/candidateSlice';
import { leaveSlice } from './slices/leaveSlice';


const hrPersistConfig = { key: 'hrAuth', storage, version: 1 };
const candidatePersistConfig = { key: 'candidates', storage, version: 1 };
const leavePersistConfig = { key: 'leave', storage, version: 1 };

const hrAuthPersistReducer = persistReducer(
  hrPersistConfig,
  hrAuthSlice.reducer
);
const candidatePersistReducer = persistReducer(candidatePersistConfig, candidateSlice.reducer);
const leaveSlicePersister=persistReducer(leavePersistConfig,leaveSlice.reducer)
export const store = configureStore({
  reducer: {
    hr: hrAuthPersistReducer,
    candidate: candidatePersistReducer,
    leave:leaveSlicePersister
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