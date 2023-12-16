import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import DynamicModuleLoader, { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "shared/ui/Stack";
import Page from "widgets/Page/Page";
import { ArticleRecommendationList } from "features/articleRecommendationList";
import { ArticleRating } from "features/articleRating";
import { articleDetailPageReducer } from "../../model/slices";
import styles from "./ArticlesDetailPage.module.scss";
import ArticleDetailPageHeader from "../ArticleDetailPageHeader/ArticleDetailPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

interface ArticlesDetailPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailPage: articleDetailPageReducer,
};

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Page className={classNames(styles.ArticlesDetailPage, {}, [className])}>{t("Статья не найдена")}</Page>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailPageHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailPage);
