import { classNames } from "shared/lib/classNames/classNames";
import { CSSProperties } from "react";
import classes from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const Skeleton = (props: SkeletonProps) => {
  const { className, height, width, border } = props;
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };
  return <div className={classNames(classes.Skeleton, {}, [className])} style={styles}></div>;
};

export default Skeleton;
