import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import { ArticleList } from "entities/Article";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Page from "widgets/Page/Page";
import { articlesPageReducer, getArticles } from "../../model/slices/articlesPageSlice";
import styles from "./ArticlePage.module.scss";
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import ArticlesPageFilters from "../ArticlePageFilters/ArticlesPageFilters";

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
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(styles.ArticlePage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={styles.list}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
