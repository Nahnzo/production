import { classNames } from "shared/lib/classNames/classNames";
import { MutableRefObject, ReactNode, memo, useRef } from "react";
import { useInfinityScroll } from "shared/lib/hooks/useInfinityScroll/useInfinityScroll";
import styles from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfinityScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  });

  return (
    <section ref={wrapperRef} className={classNames(styles.Page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});

export default Page;
