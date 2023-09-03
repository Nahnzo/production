import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import styles from "./LangSwitcher.module.scss";

interface LangSwitcherProps {
  className?: string;
}

function LangSwitcher({ className }: LangSwitcherProps) {
  const { t, i18n } = useTranslation();
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <Button
        theme={ThemeButton.CLEAR}
        onClick={toggle}
        className={classNames(styles.LangSwitcher, {}, [className])}
    >
      {t("Язык")}
    </Button>
  );
}

export default LangSwitcher;
