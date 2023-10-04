import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { memo } from "react";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <Button theme={ThemeButton.CLEAR} onClick={toggle} className={classNames("", {}, [className])}>
      {t(short ? "Короткий язык" : "Язык")}
    </Button>
  );
});

export default LangSwitcher;
