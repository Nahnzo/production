import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
  className?: string;
}

const ArticleTextBlockComponent = (props: ArticleTextBlockComponentProps) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}>
      ArticleTextBlockComponent
    </div>
  );
};

export default ArticleTextBlockComponent;
