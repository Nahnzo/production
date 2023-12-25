import { Mods, classNames } from "shared/lib/classNames/classNames";
import { CSSProperties, useMemo } from "react";
import UserIcon from "../../assets/icons/user-filled.svg";
import styles from "./Avatar.module.scss";
import AppImage from "../AppImage/AppImage";
import Icon from "../Icon/Icon";
import Skeleton from "../Skeleton/Skeleton";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100, fallbackInverted } = props;
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);
  const mods: Mods = {};
  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      className={classNames(styles.Avatar, mods, [className])}
      style={style}
    />
  );
};

export default Avatar;
