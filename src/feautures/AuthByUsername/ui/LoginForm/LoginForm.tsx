import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Input from "shared/ui/Input/Input";
import Button from "shared/ui/Button/Button";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Input type="text" className={styles.input} placeholder={t("Введите логин")} autofocus />
      <Input type="text" className={styles.input} placeholder={t("Введите пароль")} />
      <Button className={styles.loginBtn}>{t("Войти")}</Button>
    </div>
  );
};

export default LoginForm;
