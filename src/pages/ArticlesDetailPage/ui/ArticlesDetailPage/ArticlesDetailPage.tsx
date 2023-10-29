import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import styles from "./ArticlesDetailPage.module.scss";

interface ArticlesDetailPageProps {
  className?: string;
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(styles.ArticlesDetailPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <div className={classNames(styles.ArticlesDetailPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticlesDetailPage);
