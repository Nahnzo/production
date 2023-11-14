import { Article, ArticleView } from "entities/Article/model/types/article";
import { classNames } from "shared/lib/classNames/classNames";
import Text, { TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget } from "react";
import styles from "./ArticleList.module.scss";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticleListItemSkeleton from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={styles.card} view={view} key={index} />
    ));
};

const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading, view = ArticleView.SMALL, target } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        article={article}
        view={view}
        className={styles.card}
        key={article.id}
        target={target}
      />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
        <Text text={t("Статьи не найдены")} size={TextSize.L} />
      </div>
    );
  }

  return (
    <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};

export default ArticleList;
