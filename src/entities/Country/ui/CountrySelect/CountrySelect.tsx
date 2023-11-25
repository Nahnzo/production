import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ListBox from "shared/ui/ListBox/ListBox";
import { Country } from "../../index";

const options = [
  {
    value: Country.Armenia,
    content: Country.Armenia,
  },
  {
    value: Country.Belarus,
    content: Country.Belarus,
  },
  {
    value: Country.Kazakhstan,
    content: Country.Kazakhstan,
  },
  {
    value: Country.Russia,
    content: Country.Russia,
  },
  {
    value: Country.Ukraine,
    content: Country.Ukraine,
  },
];

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue={t("Укажите страну")}
      readonly={readonly}
      label={t("Укажите страну")}
      direction="top"
    />
  );
});

export default CountrySelect;
