import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleList } from "entities/Article";
import { TextSize } from "shared/ui/Text/Text";
import Text from "shared/ui/Text/Text";
import { VStack } from "shared/ui/Stack";
import { useArticleRecommendationList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationListProps {
  className?: string;
}

export const ArticleRecommendationList = memo((props: ArticleRecommendationListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data: articles, error } = useArticleRecommendationList(3);
  if (isLoading || error) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames("", {}, [className])}>
      <Text size={TextSize.L} title={t("рекомендуем")} />
      <ArticleList articles={articles} target="_blank" />
    </VStack>
  );
});
