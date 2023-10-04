import { loginReducer } from "feautures/AuthByUsername/model/slice/loginSlice";
import StoreProvider from "./ui/StoreProvider";
import type { StateScheme, ReduxStoreWithManager } from "./config/StateSchema";
import { createReduxStore, AppDispatch } from "./config/store";

export {
  StoreProvider,
  createReduxStore,
  StateScheme,
  loginReducer,
  ReduxStoreWithManager,
  AppDispatch,
};
