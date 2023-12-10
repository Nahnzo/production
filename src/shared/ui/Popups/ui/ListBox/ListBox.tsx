import { ReactNode } from "react";
import { Listbox as HListBox } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { DropdownDirection } from "shared/types/ui";
import styles from "./ListBox.module.scss";
import Button from "../../../Button/Button";
import popupStyles from "../../styles/popup.module.scss";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface ListBoxProps {
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  items?: ListBoxItem[];
  className?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const ListBox = (props: ListBoxProps) => {
  const { value, className, items, defaultValue, onChange, readonly, direction = "bottom right", label } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(styles.ListBox, {}, [className, popupStyles.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={styles.trigger} disabled={readonly}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(styles.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option key={item.value} value={item.value} disabled={item.disabled}>
              {({ active, selected }) => (
                <li
                  className={classNames(styles.item, {
                    [popupStyles.active]: active,
                    [popupStyles.disabled]: item.disabled,
                  })}
                >
                  {selected && "!"}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
export default ListBox;
