import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import StoreProvider from "./ui/StoreProvider";
import type { StateScheme, ReduxStoreWithManager, ThunkConfig } from "./config/StateSchema";
import { createReduxStore, AppDispatch } from "./config/store";

export { StoreProvider, createReduxStore, StateScheme, loginReducer, ReduxStoreWithManager, ThunkConfig };

export type { AppDispatch };
