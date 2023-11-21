import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import Text, { TextAlign } from "shared/ui/Text/Text";
import { ArticleImageBlock } from "../../model/types/article";
import styles from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} className={styles.img} alt={block.title} />
      {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
    </div>
  );
});

export default ArticleImageBlockComponent;
