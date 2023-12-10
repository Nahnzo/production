import { classNames } from "shared/lib/classNames/classNames";
import { t } from "i18next";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import Avatar from "shared/ui/Avatar/Avatar";
import { Dropdown } from "shared/ui/Popups";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Avatar.module.scss";

interface AvatarDropDownProps {
  className?: string;
}

const AvatarDropDown = (props: AvatarDropDownProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;
  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames(styles.AvatarDropdown, {}, [className])}
      direction="bottom left"
      trigger={<Avatar size={30} src={authData.avatar} />}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t("Админ") as string,
                href: RoutePath.admin_panel as string,
              },
            ]
          : []),
        {
          content: t("Профиль") as string,
          href: RoutePath.profile + authData.id,
        },
        {
          content: t("Выйти") as string,
          onClick: onLogout,
        },
      ]}
    />
  );
};

export default AvatarDropDown;
