import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { StateScheme } from "./StateSchema";
import { loginReducer } from "..";

export function createReduxStore(initialState?: StateScheme) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  };

  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
