import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import Avatar from "shared/ui/Avatar/Avatar";
import Text from "shared/ui/Text/Text";
import Skeleton from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { VStack } from "shared/ui/Stack";
import { Comment } from "../../model/types/comment";
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
      <VStack gap="8" max className={classNames(styles.CommentCard, {}, [className])}>
        <div className={styles.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={styles.username} />
        </div>
        <Skeleton width="100%" height={50} className={styles.text} />
      </VStack>
    );
  }
  if (!comment) {
    return null;
  }

  return (
    <VStack gap="8" max className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
        <Avatar size={30} src={comment.user.avatar} />
        <Text title={comment.user.username} className={styles.username} />
      </AppLink>
      <Text text={comment.text} className={styles.text} />
    </VStack>
  );
});

export default CommentCard;
