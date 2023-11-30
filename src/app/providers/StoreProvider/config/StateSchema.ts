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
import { ProfileSchema } from "features/editableProfileCard";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { SavePositionScrollSchema } from "features/SavePositionScroll";
import { AddCommentFormSchema } from "features/addCommentForm";
import { ArticleDetailPageSchema } from "pages/ArticlesDetailPage";
import { ArticlesPageSchema } from "pages/ArticlesPage";
import { rtkApi } from "shared/api/rtkApi";

export interface StateScheme {
  counter: CounterScheme;
  user: UserSchema;
  positionScroll: SavePositionScrollSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailPage?: ArticleDetailPageSchema;
}
export type StateSchemaKey = keyof StateScheme;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
}
