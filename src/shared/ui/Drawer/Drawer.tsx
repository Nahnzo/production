import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, memo } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import Portal from "../Portal/Portal";
import styles from "./Drawer.module.scss";
import Overlay from "../Overlay/Overlay";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Drawer = memo((props: DrawerProps) => {
  const { children, className, isOpen, onClose } = props;
  const { theme } = useTheme();
  const mods: Mods = {
    [styles.opened]: isOpen,
  };
  return (
    <Portal>
      <Overlay onClick={onClose} />
      <div className={classNames(styles.Drawer, mods, [className, theme, "app_drawer"])}>{children}</div>
    </Portal>
  );
});

export default Drawer;
