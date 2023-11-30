import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import { ArticleList } from "entities/Article";
import { memo, useEffect } from "react";
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { getArticles } from "../../model/slices/articlesPageSlice";

interface ArticleInfinityListProps {
  className?: string;
}

export const ArticleInfinityList = memo((props: ArticleInfinityListProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  return (
    <ArticleList
      articles={articles}
      isLoading={isLoading}
      view={view}
      className={classNames("", {}, [className])}
    />
  );
});
