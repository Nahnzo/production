import { Menu } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import styles from "./Dropdown.module.scss";
import popupStyles from "../../styles/popup.module.scss";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/consts";

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

const Dropdown = (props: DropdownProps) => {
  const { className, items, trigger, direction = "bottom right" } = props;
  const menuClasses = [mapDirectionClass[direction]];
  return (
    <Menu as="div" className={classNames(styles.Dropdown, {}, [className, popupStyles.popup])}>
      <Menu.Button className={popupStyles.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(styles.item, { [popupStyles.active]: active })}
              key={`${item.href}-${index}`}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item disabled={item.disabled} as={AppLink} to={item.href} key={`${item.href}-${index}`}>
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item disabled={item.disabled} key={`${item.href}-${index}`}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
