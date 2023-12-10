import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ListBox from "shared/ui/Popups/ui/ListBox/ListBox";
import { Currency } from "../../model/types/currency";

const options = [
  {
    value: Currency.RUB,
    content: Currency.RUB,
  },
  {
    value: Currency.EUR,
    content: Currency.EUR,
  },
  {
    value: Currency.USD,
    content: Currency.USD,
  },
];

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue={t("Укажите валюту")}
      label={t("Укажите валюту")}
      direction="top right"
    />
  );
});

export default CurrencySelect;
