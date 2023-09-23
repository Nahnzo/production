import { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { LoginModal } from "feautures/AuthByUsername";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(styles.Navbar, {}, [className])}>
      <Button className={styles.links} theme={ThemeButton.CLEAR_INVERTED} onClick={onShowModal}>
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
}

export default Navbar;
