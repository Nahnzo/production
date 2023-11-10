import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleList, ArticleView, ArticleViewSelectors } from "entities/Article";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { useSelector } from "react-redux";
import Page from "widgets/Page/Page";
import { articlesPageActions, articlesPageReducer, getArticles } from "./slices/articlesPageSlice";
import { fetchArticlesList } from "./services/fetchArticlesList/fetchArticlesList";
import styles from "./ArticlePage.module.scss";
import {
  getArticlesPageInited,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "./selectors/articlesPageSelectors";
import { fetchNextArticlesPage } from "./services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "./services/initArticlesPage/initArticlesPage";

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlePage = (props: ArticlePageProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();
  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(styles.ArticlePage, {}, [className])}
      >
        <ArticleViewSelectors view={view} onViewClick={onChangeView} />
        <ArticleList articles={articles} isLoading={isLoading} view={view} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
