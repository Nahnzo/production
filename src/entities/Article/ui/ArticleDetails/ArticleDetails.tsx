import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article/model/slices/articleDetailsSlice";
import { memo, useEffect } from "react";
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "entities/Article/model/selectros/getArticleDetailsData";
import Text, { TextAlign } from "shared/ui/Text/Text";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import styles from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  // const isLoading = useSelector(getArticleDetailsIsLoading);
  const isLoading = true;
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <div>
        <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
        <Skeleton className={styles.title} width={300} height={32} />
        <Skeleton className={styles.skeleton} width={600} height={24} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
      </div>
    );
  } else if (error) {
    content = <Text title={t("Произошла ошибка при загрузке статьи")} align={TextAlign.CENTER} />;
  } else {
    content = <div>Article details</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(styles.ArticleDetails, {}, [className])}>{content}</div>
    </DynamicModuleLoader>
  );
});

export default ArticleDetails;
