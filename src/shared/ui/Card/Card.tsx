import { classNames } from "shared/lib/classNames/classNames";
import { HTMLAttributes, ReactNode, memo } from "react";
import styles from "./Card.module.scss";

export enum CardTheme {
  NORMAL = "normal",
  OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

const Card = memo((props: CardProps) => {
  const { className, children, theme = CardTheme.NORMAL, max, ...otherProps } = props;

  return (
    <div className={classNames(styles.Card, { [styles.max]: max }, [className, styles[theme]])} {...otherProps}>
      {children}
    </div>
  );
});

export default Card;
