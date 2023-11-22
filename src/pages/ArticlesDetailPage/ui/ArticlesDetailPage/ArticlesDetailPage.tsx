import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleDetails, ArticleList } from "entities/Article";
import { useParams } from "react-router-dom";
import Text, { TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { AddCommentForm } from "feautures/addCommentForm";
import { VStack } from "shared/ui/Stack";
import Page from "widgets/Page/Page";
import { getArticlesComments } from "../../model/slices/articleDetailCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { getArticlesRecommendations } from "../../model/slices/articleDetailPageRecommendationSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailPageReducer } from "../../model/slices";
import styles from "./ArticlesDetailPage.module.scss";
import ArticleDetailPageHeader from "../ArticleDetailPageHeader/ArticleDetailPageHeader";

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
  const comments = useSelector(getArticlesComments.selectAll);
  const recommendations = useSelector(getArticlesRecommendations.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

  const dispatch = useAppDispatch();
  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailPageHeader />
          <ArticleDetails id={id} />
          <Text size={TextSize.L} title={t("рекомендуем")} className={styles.commentTitle} />
          <ArticleList
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            className={styles.recommendations}
            target="_blank"
          />
          <Text size={TextSize.L} title={t("Комментарии")} className={styles.commentTitle} />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailPage);
