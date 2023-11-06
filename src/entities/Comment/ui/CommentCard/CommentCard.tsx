import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "entities/Comment/model/types/comment";
import { memo } from "react";
import Avatar from "shared/ui/Avatar/Avatar";
import Text from "shared/ui/Text/Text";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import styles from "./CommentCard.module.scss";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(styles.CommentCard, {}, [className])}>
        <div className={styles.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={styles.username} />
        </div>
        <Skeleton width="100%" height={50} className={styles.text} />
      </div>
    );
  }
  if (!comment) {
    return null;
  }

  return (
    <div className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
        <Avatar size={30} />
        <Text title={comment.user.username} className={styles.username} />
      </AppLink>
      <Text text={comment.text} className={styles.text} />
    </div>
  );
});

export default CommentCard;
