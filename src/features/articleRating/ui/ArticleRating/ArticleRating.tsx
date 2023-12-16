import { RatingCard } from "entities/Rating";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { memo, useCallback } from "react";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi";

export interface ArticleRatingProps {
  className?: string;
  articleId?: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    articleId: articleId ?? "",
    userId: userData?.id?.toString() ?? "",
  });
  const [rateArticleMutation] = useRateArticle();
  const handleRatingArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id?.toString() ?? "",
          articleId: articleId ?? "",
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );
  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRatingArticle(starsCount, feedback);
    },
    [handleRatingArticle]
  );
  const onCancel = useCallback(
    (starsCount: number) => {
      handleRatingArticle(starsCount);
    },
    [handleRatingArticle]
  );

  if (isLoading) {
    return <Skeleton width="100%" height="120" />;
  }
  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title={t("Оцените статью")}
      feedbackTitle={t("Оставьте свой отзыв, это поможет нам улучшить качество")}
      hasFeedback
    />
  );
});

export default ArticleRating;
