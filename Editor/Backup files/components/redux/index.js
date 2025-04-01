import { configureStore } from "@reduxjs/toolkit";
import editorSettingsReducer from "./editorSettingsSlice";
import commanUseReducer from "./CommanUse";
import AuthSlice from "./AuthSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Define the persist config
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  editorSettings: editorSettingsReducer,
  auth: AuthSlice,
  commnuse: commanUseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor to persist the store
export const persistor = persistStore(store);
export const clearPersistedStorage = () => {
  return persistor.purge().then(() => {});
};

export default store;
