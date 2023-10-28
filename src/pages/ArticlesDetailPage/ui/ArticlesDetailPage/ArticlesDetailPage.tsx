import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import styles from "./ArticlesDetailPage.module.scss";

interface ArticlesDetailPageProps {
  className?: string;
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article");

  return (
    <div className={classNames(styles.ArticlesDetailPage, {}, [className])}>
      ARTICLE DETAIL PAGE
    </div>
  );
};

export default memo(ArticlesDetailPage);
