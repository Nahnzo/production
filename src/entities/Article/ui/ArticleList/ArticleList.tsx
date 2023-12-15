import { classNames } from "shared/lib/classNames/classNames";
import Text, { TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget } from "react";
import { PAGE_ID } from "widgets/Page/Page";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { Article, ArticleView } from "../../model/types/article";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticleListItemSkeleton from "../ArticleListItem/ArticleListItemSkeleton";
import styles from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton className={styles.card} view={view} key={index} />);
};

const ArticleList = (props: ArticleListProps) => {
  const { articles, className, isLoading, view = ArticleView.SMALL, target, virtualized = true } = props;
  const { t } = useTranslation();

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 3;

  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);
  const rowRender = ({ index, isScrolling, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem article={articles[i]} view={view} className={styles.card} target={target} key={`str + ${i}`} />
      );
    }
    return (
      <div key={key} style={style} className={styles.row}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
        <Text text={t("Статьи не найдены")} size={TextSize.L} />
      </div>
    );
  }
  return <h1>Нету</h1>;

  // return (
  //   <WindowScroller onScroll={() => console.log("scroll")} scrollElement={document.getElementById(PAGE_ID) as Element}>
  //     {({ height, width, registerChild, onChildScroll, scrollTop, isScrolling }) => (
  //       <div
  //         className={classNames(styles.ArticleList, {}, [className, styles[view]])}
  //         // @ts-ignore
  //         ref={registerChild}
  //       >
  //         {virtualized ? (
  //           <List
  //             height={height ?? 700}
  //             rowCount={rowCount}
  //             rowHeight={isBig ? 700 : 330}
  //             rowRenderer={rowRender}
  //             width={width ? width - 80 : 700}
  //             autoHeight
  //             onScroll={onChildScroll}
  //             isScrolling={isScrolling}
  //             scrollTop={scrollTop}
  //           />
  //         ) : (
  //           articles.map((item) => (
  //             <ArticleListItem article={item} view={view} target={target} key={item.id} className={styles.card} />
  //           ))
  //         )}
  //         {isLoading && getSkeletons(view)}
  //       </div>
  //     )}
  //   </WindowScroller>
  // );
};

export default ArticleList;
