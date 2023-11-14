import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleDetails, ArticleList } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import Text, { TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailCommentsReducer,
  getArticlesComments,
} from "pages/ArticlesDetailPage/model/slices/articleDetailCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "pages/ArticlesDetailPage/model/selectors/comments";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { fetchCommentsByArticleId } from "pages/ArticlesDetailPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "feautures/addCommentForm";
import { addCommentForArticle } from "pages/ArticlesDetailPage/model/services/addCommentForArticle/addCommentForArticle";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import Page from "widgets/Page/Page";
import {
  articleDetailPageRecommendationReducer,
  getArticlesRecommendations,
} from "pages/ArticlesDetailPage/model/slices/articleDetailPageRecommendationSlice";
import { getArticleRecommendationsIsLoading } from "pages/ArticlesDetailPage/model/selectors/recommendations";
import { fetchArticleRecommendations } from "pages/ArticlesDetailPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailPageReducer } from "pages/ArticlesDetailPage/model/slices";
import styles from "./ArticlesDetailPage.module.scss";

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
  const navigate = useNavigate();
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);
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
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailPage);
