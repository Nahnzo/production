import { classNames } from "shared/lib/classNames/classNames";
import { MutableRefObject, ReactNode, memo, useRef, UIEvent, useEffect } from "react";
import { useInfinityScroll } from "shared/lib/hooks/useInfinityScroll/useInfinityScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import { savePositionScrollActions } from "feautures/SavePositionScroll";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPositionScrollByPath } from "feautures/SavePositionScroll/model/selectors/savePositionScrollSelectors";
import { StateScheme } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
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
  const { pathname } = useLocation();
  const scrollPosition = useSelector(
    (state: StateScheme) => getPositionScrollByPath(state, pathname)
    // eslint-disable-next-line function-paren-newline
  );

  const dispatch = useAppDispatch();

  useInfinityScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  });
  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });
  const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
    dispatch(
      savePositionScrollActions.setScrollPosition({
        position: event.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? <div ref={triggerRef} className={styles.trigger} /> : null}
    </section>
  );
});

export default Page;