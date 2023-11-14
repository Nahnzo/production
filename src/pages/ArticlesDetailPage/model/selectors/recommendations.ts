/* eslint-disable implicit-arrow-linebreak */
import { StateScheme } from "app/providers/StoreProvider";

export const getArticleRecommendationsIsLoading = (state: StateScheme) =>
  state.articleDetailPage?.recommendations?.isLoading;
export const getArticleRecommendationsError = (state: StateScheme) =>
  state.articleDetailPage?.recommendations?.error;
