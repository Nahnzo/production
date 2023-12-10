import { ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { mapDirectionClass } from "../../styles/consts";
import popupStyles from "../../styles/popup.module.scss";
import styles from "./Popover.module.scss";

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children?: ReactNode;
}

const Popover = (props: PopoverProps) => {
  const { className, trigger, direction = "bottom right", children } = props;
  const menuClasses = [mapDirectionClass[direction]];
  return (
    <HPopover className={classNames(styles.Popover, {}, [className, popupStyles.popup])}>
      <HPopover.Button className={popupStyles.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(styles.panel, {}, menuClasses)}>{children}</HPopover.Panel>
    </HPopover>
  );
};

export default Popover;
