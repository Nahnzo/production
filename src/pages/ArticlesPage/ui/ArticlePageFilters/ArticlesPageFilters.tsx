import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import {
  ArticleSortField,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelectors,
} from "entities/Article";
import { useSelector } from "react-redux";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { memo, useCallback, useMemo } from "react";
import { articlesPageActions } from "pages/ArticlesPage/model/slices/articlesPageSlice";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/Card/Card";
import Input from "shared/ui/Input/Input";
import ArticleSortSelector from "entities/Article/ui/ArticleSortSelector/ArticleSortSelector";
import { SortOrder } from "shared/types";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import Tabs, { TabsItem } from "shared/ui/Tabs/Tabs";
import { ArticleType } from "entities/Article/model/types/article";
import styles from "./ArticlePageFilters.module.scss";

interface ArticlesPageFiltersProps {
  className?: string;
}

const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);
  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );
  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );
  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  return (
    <div className={classNames(styles.ArticlesPageFilters, {}, [className])}>
      <div className={styles.sortWrapper}>
        <ArticleSortSelector
          onChangeOrder={onChangeOrder}
          order={order}
          sort={sort}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelectors view={view} onViewClick={onChangeView} />
      </div>
      <Card className={styles.search}>
        <Input placeholder={t("Поиск")} value={search} onChange={onChangeSearch} />
      </Card>
      <ArticleTypeTabs onChangeType={onChangeType} value={type} className={styles.tabs} />
    </div>
  );
});

export default ArticlesPageFilters;
