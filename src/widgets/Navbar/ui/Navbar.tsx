import { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { LoginModal } from "feautures/AuthByUsername";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";
import Text, { TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(styles.Navbar, {}, [className])}>
        <Text className={styles.appName} title={t("SNGLRTY APP")} theme={TextTheme.INVERTED} />
        <AppLink
          to={RoutePath.articles_create}
          theme={AppLinkTheme.SECONDARY}
          className={styles.createBtn}
        >
          {t("Создать статью")}
        </AppLink>
        <Button className={styles.links} theme={ThemeButton.CLEAR_INVERTED} onClick={onLogout}>
          {t("Выйти")}
        </Button>
      </header>
    );
  }

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <Button className={styles.links} theme={ThemeButton.CLEAR_INVERTED} onClick={onShowModal}>
        {t("Войти")}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  );
});

export default Navbar;
