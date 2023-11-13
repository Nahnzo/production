import { classNames } from "shared/lib/classNames/classNames";
import { ReactNode, memo, useCallback } from "react";
import styles from "./Tabs.module.scss";
import Card, { CardTheme } from "../Card/Card";

export interface TabsItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabsItem[];
  value: string;
  onTabClick: (tab: TabsItem) => void;
}
const Tabs = memo((props: TabsProps) => {
  const { className, tabs, onTabClick, value } = props;
  const clickHandle = useCallback(
    (tab: TabsItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick]
  );
  return (
    <div className={classNames(styles.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={styles.tab}
          key={tab.value}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});

export default Tabs;
