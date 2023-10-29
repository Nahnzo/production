import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entities/Article";
import { CounterScheme } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { LoginSchema } from "feautures/AuthByUsername";
import { NavigateOptions, To } from "react-router-dom";

export interface StateScheme {
  counter: CounterScheme;
  user: UserSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
}
export type StateSchemaKey = keyof StateScheme;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
}
