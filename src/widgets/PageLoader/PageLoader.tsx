import { classNames } from "shared/lib/classNames/classNames";
import Loader from "shared/ui/Loader/Loader";
import styles from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}

const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(styles.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};

export default PageLoader;
