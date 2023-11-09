import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { ArticleView } from "entities/Article/model/types/article";
import ListIcon from "shared/assets/icons/list-24-24.svg";
import TiledIcon from "shared/assets/icons/tiled-24-24.svg";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Icon from "shared/ui/Icon/Icon";
import styles from "./ArticleViewSelectors.module.scss";

interface ArticleViewSelectorsProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

const ArticleViewSelectors = memo((props: ArticleViewSelectorsProps) => {
  const { className, view, onViewClick } = props;
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };
  return (
    <div className={classNames(styles.ArticleViewSelectors, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
          <Icon
            Svg={viewType.icon}
            className={classNames("", { [styles.notSelected]: viewType.view !== view })}
          />
        </Button>
      ))}
    </div>
  );
});

export default ArticleViewSelectors;
