import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  "articlesDetailPage/fetchArticleRecommendations",
  async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _limit: 4,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
