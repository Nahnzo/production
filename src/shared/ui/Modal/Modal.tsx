import { classNames } from "shared/lib/classNames/classNames";
import { ReactEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "app/providers/ThemeProvider";
import React from "react";
import styles from "./Modal.module.scss";
import Portal from "../Portal/Portal";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const { className, children, isOpen, onClose } = props;
  const { theme } = useTheme();
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
    [styles[theme]]: true,
  };

  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [className])}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.content} onClick={clickHandler}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
