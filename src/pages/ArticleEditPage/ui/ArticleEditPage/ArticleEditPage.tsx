import { classNames } from "shared/lib/classNames/classNames";
import Page from "widgets/Page/Page";
import { useParams } from "react-router-dom";
import styles from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  return <Page className={classNames(styles.ArticleEditPage, {}, [className])}>dasd</Page>;
};

export default ArticleEditPage;
