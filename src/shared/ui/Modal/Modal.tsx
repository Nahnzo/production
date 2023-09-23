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
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { className, children, isOpen, onClose, lazy } = props;
  const { theme } = useTheme();
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

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
  };

  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (lazy && !isMounted) {
    return null;
  }
  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [className, theme, "app_modal"])}>
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
