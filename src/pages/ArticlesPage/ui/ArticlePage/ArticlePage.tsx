import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import styles from "./ArticlePage.module.scss";

interface ArticlePageProps {
  className?: string;
}

const ArticlePage = (props: ArticlePageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");

  return <div className={classNames(styles.ArticlePage, {}, [className])}></div>;
};

export default memo(ArticlePage);
