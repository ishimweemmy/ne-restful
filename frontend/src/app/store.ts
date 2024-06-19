import { configureStore } from "@reduxjs/toolkit";
import { persistConfig } from "./config";
import { rootReducer } from "src/features/rootReducer";
import { persistStore, persistReducer } from "redux-persist";

const persistedReducer = persistReducer(persistConfig, rootReducer);
const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
