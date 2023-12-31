import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import Avatar from "shared/ui/Avatar/Avatar";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import CalendarIcon from "shared/assets/icons/calendar-20-20.svg";
import Icon from "shared/ui/Icon/Icon";
import DynamicModuleLoader, { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack, VStack } from "shared/ui/Stack";
import { useSelector } from "react-redux";
import Text, { TextAlign, TextSize } from "shared/ui/Text/Text";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slices/articleDetailsSlice";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectros/getArticleDetailsData";
import ArticleCodeBlockComponent from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import ArticleImageBlockComponent from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import ArticleTextBlockComponent from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
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
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} className={styles.block} block={block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} className={styles.block} block={block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} className={styles.block} block={block} />;
      default:
        return null;
    }
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
        <Skeleton className={styles.title} width={300} height={32} />
        <Skeleton className={styles.skeleton} width={600} height={24} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = <Text title={t("Произошла ошибка при загрузке статьи")} align={TextAlign.CENTER} />;
  } else {
    content = (
      <>
        <HStack justify="center" max className={styles.avatarWrapper}>
          <Avatar size={200} src={article?.img} />
        </HStack>
        <VStack gap="4" max>
          <Text title={article?.title} text={article?.subtitle} className={styles.title} size={TextSize.L} />
          <HStack gap="8" className={styles.articleInfo}>
            <Icon className={styles.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" className={styles.articleInfo}>
            <Icon className={styles.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" max className={classNames(styles.ArticleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});

export default ArticleDetails;
