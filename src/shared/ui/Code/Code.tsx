import { ReactNode, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import CopyIcon from "shared/assets/icons/copy-20-20.svg";
import styles from "./Code.module.scss";
import Button, { ThemeButton } from "../Button/Button";

interface CodeProps {
  className?: string;
  text: string;
}

const Code = memo((props: CodeProps) => {
  const { text, className } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(styles.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={styles.copyBtn}
        theme={ThemeButton.CLEAR}
        // title="Скопировать"
      >
        <CopyIcon className={styles.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});

export default Code;
