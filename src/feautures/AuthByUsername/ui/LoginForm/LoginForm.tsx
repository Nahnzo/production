import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Input from "shared/ui/Input/Input";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { memo, useCallback } from "react";
import Text, { TextTheme } from "shared/ui/Text/Text";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginActions } from "../../model/slice/loginSlice";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);
  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ password, username }));
  }, [dispatch, password, username]);

  const { t } = useTranslation();

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Text text={t("Форма авторизации")} />
      {error && <Text text={t("Вы ввели неверный логин или пароль")} theme={TextTheme.ERROR} />}
      <Input
        type="text"
        className={styles.input}
        placeholder={t("Введите логин")}
        autofocus
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        className={styles.input}
        placeholder={t("Введите пароль")}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={styles.loginBtn}
        theme={ThemeButton.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t("Войти")}
      </Button>
    </div>
  );
});

export default LoginForm;
