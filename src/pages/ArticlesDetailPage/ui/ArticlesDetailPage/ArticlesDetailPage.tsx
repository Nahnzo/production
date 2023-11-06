import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import Text from "shared/ui/Text/Text";
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
import styles from "./ArticlesDetailPage.module.scss";

interface ArticlesDetailPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailComments: articleDetailCommentsReducer,
};

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticlesComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();
  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  if (!id) {
    return (
      <div className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t("Комментарии")} className={styles.commentTitle} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesDetailPage);
