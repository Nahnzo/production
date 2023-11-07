import { Article, ArticleView } from "entities/Article/model/types/article";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleList.module.scss";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticleListItemSkeleton from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={styles.card} view={view} key={index} />
    ));
};

const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading, view = ArticleView.SMALL } = props;

  if (isLoading) {
    return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem article={article} view={view} className={styles.card} key={article.id} />
    );
  };
  return (
    <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  );
};

export default ArticleList;
