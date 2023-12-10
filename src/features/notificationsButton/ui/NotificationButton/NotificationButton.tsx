import { Popover } from "shared/ui/Popups";
import { NotificationList } from "entities/Notification";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Icon from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import styles from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton = (props: NotificationButtonProps) => {
  const { className } = props;
  return (
    <Popover
      className={classNames(styles.NotificationButton, {}, [className])}
      direction="bottom left"
      trigger={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={styles.notifications} />
    </Popover>
  );
};

export default NotificationButton;
