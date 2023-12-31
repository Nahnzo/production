import { memo, useMemo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import Button, { ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import LangSwitcher from "widgets/LangSwitcher/LangSwitcher";
import { useSelector } from "react-redux";
import VStack from "shared/ui/Stack/VStack/VStack";
import styles from "./Sidebar.module.scss";
import SidebarItem from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "./model/selectors/getSidebarItems";

interface SidebarProps {
  className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  const sidebarItemsList = useSelector(getSidebarItems);
  const itemsList = useMemo(() => {
    return sidebarItemsList?.map((item) => (
      <SidebarItem item={item} collapsed={collapsed} key={item.path} />
    ));
  }, [collapsed, sidebarItemsList]);

  return (
    <aside
      className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}
      data-testid="sidebar-toggle"
    >
      <Button
        onClick={onToggle}
        className={styles.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <VStack role="navigation" gap="8" className={styles.items}>
        {itemsList}
      </VStack>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} short={collapsed} />
      </div>
    </aside>
  );
});

export default Sidebar;
