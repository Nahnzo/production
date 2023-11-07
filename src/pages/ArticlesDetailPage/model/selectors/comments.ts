/* eslint-disable implicit-arrow-linebreak */
import { StateScheme } from "app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: StateScheme) =>
  state.articleDetailComments?.isLoading;
export const getArticleCommentsError = (state: StateScheme) => state.articleDetailComments?.error;
