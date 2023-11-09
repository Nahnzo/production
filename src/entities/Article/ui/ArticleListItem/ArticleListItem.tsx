import { classNames } from "shared/lib/classNames/classNames";
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from "entities/Article/model/types/article";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import Icon from "shared/ui/Icon/Icon";
import Card from "shared/ui/Card/Card";
import Avatar from "shared/ui/Avatar/Avatar";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import styles from "./ArticleListItem.module.scss";
import ArticleTextBlockComponent from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

const ArticleListItem = (props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.articlesDetails + article.id);
  }, [article.id, navigate]);
  const types = <Text text={article.type.join(", ")} className={styles.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={styles.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;
    return (
      <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={styles.username} />
            <Text text={article.createdAt} className={styles.date} />
          </div>
          <Text text={article.title} className={styles.title} />
          {types}
          <img src={article.img} className={styles.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={styles.textBlock} />
          )}
          <div className={styles.footer}>
            <Button theme={ThemeButton.OUTLINE} onClick={onOpenArticle}>
              {t("Читать далее")}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
      <Card className={styles.card} onClick={onOpenArticle}>
        <div className={styles.imageWrapper}>
          <img src={article.img} className={styles.img} alt={article.title} />
          <Text text={article.createdAt} className={styles.date} />
        </div>
        <div className={styles.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={styles.title} />
      </Card>
    </div>
  );
};

export default ArticleListItem;
