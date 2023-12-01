import { Menu } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import styles from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": styles.optionsBottomLeft,
  "bottom right": styles.optionsBottomRight,
  "top right": styles.optionsTopRight,
  "top left": styles.optionsTopLeft,
};

const Dropdown = (props: DropdownProps) => {
  const { className, items, trigger, direction = "bottom right" } = props;
  const menuClasses = [mapDirectionClass[direction]];
  return (
    <Menu as="div" className={classNames(styles.Dropdown, {}, [className])}>
      <Menu.Button className={styles.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(styles.item, { [styles.active]: active })}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item disabled={item.disabled} as={AppLink} to={item.href}>
                {content}
              </Menu.Item>
            );
          }

          return <Menu.Item disabled={item.disabled}>{content}</Menu.Item>;
        })}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;