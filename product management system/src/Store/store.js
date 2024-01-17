import {
  configureStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {rootReducer} from './rootReducer.js';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createExpireTransform from 'redux-persist-transform-expire';

const expireTransform = createExpireTransform({
  expireKey: 'expiresIn',
  defaultState: {
    currentUser: null,
    expiresIn: null
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [expireTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export const persistor = persistStore(store);
