import { Mods, classNames } from "shared/lib/classNames/classNames";
import { CSSProperties, useMemo } from "react";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size } = props;
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);
  const mods: Mods = {};
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(styles.Avatar, mods, [className])}
      style={style}
    />
  );
};

export default Avatar;
