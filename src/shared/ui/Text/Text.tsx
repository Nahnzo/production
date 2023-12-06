import { Mods, classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import styles from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
  INVERTED = "inverted",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum TextSize {
  M = "size_m",
  S = "size_s",
  L = "size_l",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;

  "data-testid"?: string;
}

type HeaderTagType = "h1" | "h2" | "h3";
const mapSizeHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.L]: "h1",
  [TextSize.M]: "h2",
  [TextSize.S]: "h3",
};

const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    "data-testid": dataTestId = "Text",
  } = props;
  const mods: Mods = {
    [styles[theme]]: true,
    [styles[align]]: true,
    [styles[size]]: true,
  };

  const HeaderTag = mapSizeHeaderTag[size];
  return (
    <div className={classNames(styles.Text, mods, [className])}>
      {title && (
        <HeaderTag className={styles.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={styles.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});

export default Text;
