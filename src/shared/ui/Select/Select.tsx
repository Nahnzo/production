import { Mods, classNames } from "shared/lib/classNames/classNames";
import { ChangeEvent, memo, useMemo } from "react";
import styles from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readonly } = props;
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as T);
  };

  const optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option className={styles.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);

  const mods: Mods = {};
  return (
    <div className={classNames(styles.Wrapper, mods, [className])}>
      {label && <span className={styles.label}>{`${label}>`}</span>}
      <select
        className={styles.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  );
};

export default Select;
