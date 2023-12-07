/* eslint-disable implicit-arrow-linebreak */
import { CombinedState, Reducer, ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { $api } from "shared/api/api";
import { savePositionScrollReducer } from "features/SavePositionScroll";
import { rtkApi } from "shared/api/rtkApi";
import { StateScheme, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(initialState?: StateScheme, asyncReducers?: ReducersMapObject<StateScheme>) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    positionScroll: savePositionScrollReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  });
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
