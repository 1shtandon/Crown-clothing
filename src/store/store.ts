import { configureStore, Middleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";
import { persistedRootReducer, rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
