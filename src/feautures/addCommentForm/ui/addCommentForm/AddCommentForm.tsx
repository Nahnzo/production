import { classNames } from "shared/lib/classNames/classNames";
import Input from "shared/ui/Input/Input";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "feautures/addCommentForm/model/selectors/addCommentFormSelectors";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDistpatch/useAppDispatch";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "feautures/addCommentForm/model/slices/addCommentFormSlice";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import styles from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const onCommentChangeText = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );
  const onSendhandler = useCallback(() => {
    onSendComment(text || "");
    onCommentChangeText("");
  }, [onCommentChangeText, text, onSendComment]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(styles.AddCommentForm, {}, [className])}>
        <Input
          className={styles.input}
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={onCommentChangeText}
        />
        <Button onClick={onSendhandler}>{t("Отправить")}</Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;