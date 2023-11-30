import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import Page from "widgets/Page/Page";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import styles from "./ArticlePage.module.scss";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import ArticlesPageFilters from "../ArticlePageFilters/ArticlesPageFilters";
import { ArticleInfinityList } from "../ArticleInfinityList/ArticleInfinityList";

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlePage = (props: ArticlePageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(styles.ArticlePage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleInfinityList className={styles.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlePage);
