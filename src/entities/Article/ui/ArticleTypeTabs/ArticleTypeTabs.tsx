import { classNames } from "shared/lib/classNames/classNames";
import Tabs, { TabsItem } from "shared/ui/Tabs/Tabs";
import { t } from "i18next";
import { ArticleType } from "pages/ArticlesPage";
import { useCallback, useMemo } from "react";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}
const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const onTabClick = useCallback(
    (tab: TabsItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType]
  );
  const typesTabs = useMemo<TabsItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("Все") as string,
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("Экономика") as string,
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Наука") as string,
      },
      {
        value: ArticleType.IT,
        content: t("Айти") as string,
      },
    ],
    []
  );

  return <Tabs value={value} tabs={typesTabs} onTabClick={onTabClick} className={classNames("", {}, [className])} />;
};

export default ArticleTypeTabs;
