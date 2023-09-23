import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

const Input = memo((props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [curetPosition, setCuretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    ...otherProps
  } = props;
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
    setCuretPosition(event.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onSelect = (event: any) => {
    setCuretPosition(event?.target?.selectionStart || 0);
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  return (
    <div className={classNames(styles.InputWrapper, {}, [className])}>
      {placeholder && <div className={styles.placeholder}>{`${placeholder} >`}</div>}
      <div className={styles.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && <span className={styles.caret} style={{ left: `${curetPosition * 9}px` }} />}
      </div>
    </div>
  );
});

export default Input;
