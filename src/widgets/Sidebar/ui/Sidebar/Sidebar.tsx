import { classNames } from "shared/lib/classNames/classNames";
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}>
      <button onClick={onToggle}>toggle</button>
      <div className={styles.swithers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
