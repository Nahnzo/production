import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/Button/Button";
import styles from "./PageError.module.scss";

interface PageErrorProps {
  className?: string;
}

const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(styles.PageError, {}, [className])}>
      <p>{t("Произошла непредвиденная ошибка")}</p>
      <Button onClick={reload}>{t("Обновить страницу")}</Button>
    </div>
  );
};

export default PageError;
