import { ArticleDetailsCommentSchema } from "./ArticleDetailCommentsSchema";
import { ArticleDetailRecommendationSchema } from "./ArticleDetailRecommendationSchema";

export interface ArticleDetailPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailRecommendationSchema;
}
