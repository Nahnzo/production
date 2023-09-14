import { classNames } from "shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = "clear",
  OUTLINE = "outline",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

const Button: FC<ButtonProps> = (props) => {
  const { className, theme, children, ...otherProps } = props;

  return (
    <button
      type="button"
      className={classNames(styles.ThemeSwitcher, {}, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
