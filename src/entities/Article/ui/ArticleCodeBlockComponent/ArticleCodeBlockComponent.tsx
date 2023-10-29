import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleCodeBlockComponent.module.scss";

interface ArticleCodeBlockComponentProps {
  className?: string;
}

const ArticleCodeBlockComponent = (props: ArticleCodeBlockComponentProps) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticleCodeBlockComponent, {}, [className])}>
      ArticleCodeBlockComponent
    </div>
  );
};

export default ArticleCodeBlockComponent;
