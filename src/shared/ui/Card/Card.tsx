import { classNames } from "shared/lib/classNames/classNames";
import { HTMLAttributes, ReactNode, memo } from "react";
import styles from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div className={classNames(styles.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
});

export default Card;
