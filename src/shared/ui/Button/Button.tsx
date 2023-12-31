import { Mods, classNames } from "shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import styles from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

const Button = memo((props: ButtonProps) => {
  const {
    className,
    theme = ThemeButton.OUTLINE,
    children,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles[theme]]: true,
    [styles[size]]: true,
    [styles.square]: square,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(styles.ThemeSwitcher, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
