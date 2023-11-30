import { classNames } from "shared/lib/classNames/classNames";
import { MutableRefObject, ReactNode, memo, useRef, UIEvent, useEffect } from "react";
import { useInfinityScroll } from "shared/lib/hooks/useInfinityScroll/useInfinityScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { savePositionScrollActions } from "features/SavePositionScroll";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPositionScrollByPath } from "features/SavePositionScroll/model/selectors/savePositionScrollSelectors";
import { StateScheme } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
import styles from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}
export const PAGE_ID = "PAGE_ID";

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
    <main
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
    >
      {children}
      {onScrollEnd ? <div ref={triggerRef} className={styles.trigger} /> : null}
    </main>
  );
});

export default Page;
