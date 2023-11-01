import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { ArticleTextBlock } from "entities/Article/model/types/article";
import Text from "shared/ui/Text/Text";
import styles from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={styles.title} />}
      {block.paragraphs.map((paragraph, index) => (
        <Text key={paragraph} text={paragraph} className={styles.paragraph} />
      ))}
    </div>
  );
});

export default ArticleTextBlockComponent;
