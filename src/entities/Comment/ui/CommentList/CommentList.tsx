import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import { Comment } from "entities/Comment/model/types/comment";
import { memo } from "react";
import CommentCard from "../CommentCard/CommentCard";
import styles from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

const CommentList = memo((props: CommentListProps) => {
  const { t } = useTranslation();
  const { className, comments, isLoading } = props;
  if (isLoading) {
    return (
      <div className={classNames(styles.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }
  return (
    <div className={classNames(styles.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            comment={comment}
            className={styles.comment}
            isLoading={isLoading}
            key={comment.id}
          />
        ))
      ) : (
        <Text text={t("Комментарии отсутствуют")} />
      )}
    </div>
  );
});

export default CommentList;
