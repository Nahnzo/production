/* eslint-disable implicit-arrow-linebreak */
import { StateScheme } from "app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: StateScheme) =>
  state.articleDetailPage?.comments?.isLoading;
export const getArticleCommentsError = (state: StateScheme) =>
  state.articleDetailPage?.comments?.error;
