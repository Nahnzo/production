import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailPageSchema } from "../types";
import { articleDetailPageRecommendationReducer } from "./articleDetailPageRecommendationSlice";
import { articleDetailCommentsReducer } from "./articleDetailCommentsSlice";

export const articleDetailPageReducer = combineReducers<ArticleDetailPageSchema>({
  recommendations: articleDetailPageRecommendationReducer,
  comments: articleDetailCommentsReducer,
});
