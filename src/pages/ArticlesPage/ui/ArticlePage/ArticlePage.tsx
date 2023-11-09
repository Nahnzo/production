import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleList, ArticleView, ArticleViewSelectors } from "entities/Article";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { useSelector } from "react-redux";
import { articlesPageActions, articlesPageReducer, getArticles } from "./slices/articlesPageSlice";
import { fetchArticlesList } from "./services/fetchArticlesList/fetchArticlesList";
import styles from "./ArticlePage.module.scss";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "./selectors/articlesPageSelectors";

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlePage = (props: ArticlePageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();
  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(styles.ArticlePage, {}, [className])}>
        <ArticleViewSelectors view={view} onViewClick={onChangeView} />
        <ArticleList articles={articles} isLoading={isLoading} view={view} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
