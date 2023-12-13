import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, memo } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import Portal from "../Portal/Portal";
import styles from "./Drawer.module.scss";
import Overlay from "../Overlay/Overlay";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const Drawer = memo((props: DrawerProps) => {
  const { children, className, isOpen, onClose, lazy } = props;
  const { theme } = useTheme();
  const { close, isClosing, isMounted } = useModal({ animationDelay: 300, onClose, isOpen });
  const mods: Mods = {
    [styles.opened]: isOpen,
  };
  if (lazy && !isMounted) {
    return null;
  }
  return (
    <Portal>
      <Overlay onClick={close} />
      <div className={classNames(styles.Drawer, mods, [className, theme, "app_drawer"])}>{children}</div>
    </Portal>
  );
});

export default Drawer;
