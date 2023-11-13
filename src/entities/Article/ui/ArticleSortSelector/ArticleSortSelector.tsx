import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortField } from "entities/Article/model/types/article";
import Select, { SelectOption } from "shared/ui/Select/Select";
import { SortOrder } from "shared/types";
import styles from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, onChangeOrder, order, onChangeSort } = props;
  const { t } = useTranslation();
  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("Возврастанию"),
      },
      {
        value: "desc",
        content: t("Убыванию"),
      },
    ],
    [t]
  );
  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("Дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("По названию"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("По просмотрам"),
      },
    ],
    [t]
  );

  return (
    <div className={classNames(styles.ArticleSortSelector, {}, [className])}>
      <Select
        options={sortFieldOptions}
        label={t("Сортировать По")}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label={t("По")}
        value={order}
        onChange={onChangeOrder}
        className={styles.order}
      />
    </div>
  );
});

export default ArticleSortSelector;
