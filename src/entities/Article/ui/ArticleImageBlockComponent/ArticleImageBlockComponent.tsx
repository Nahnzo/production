import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  className?: string;
}

const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
      ArticleImageBlockComponent
    </div>
  );
};

export default ArticleImageBlockComponent;
