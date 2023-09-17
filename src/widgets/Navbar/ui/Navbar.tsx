import { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Modal from "shared/ui/Modal/Modal";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(styles.Navbar, {}, [className])}>
      <Button className={styles.links} theme={ThemeButton.CLEAR_INVERTED} onClick={onToggleModal}>
        {t("Войти")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi error a! Eaque
        recusandae, quas voluptatem sed, soluta accusantium, iure iusto minima quam fugiat itaque
        dicta vel minus accusamus culpa!
      </Modal>
    </div>
  );
}

export default Navbar;
