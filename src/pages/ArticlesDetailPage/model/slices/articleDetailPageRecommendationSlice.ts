import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { ArticleDetailRecommendationSchema } from "../types/ArticleDetailRecommendationSchema";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticlesRecommendations = recommendationsAdapter.getSelectors<StateScheme>(
  (state) => state.articleDetailPage?.recommendations || recommendationsAdapter.getInitialState()
);

const articleDetailPageRecommendationSlice = createSlice({
  name: "articleDetailPageRecommendationSlice",
  initialState: recommendationsAdapter.getInitialState<ArticleDetailRecommendationSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// eslint-disable-next-line operator-linebreak
export const { reducer: articleDetailPageRecommendationReducer } =
  articleDetailPageRecommendationSlice;
