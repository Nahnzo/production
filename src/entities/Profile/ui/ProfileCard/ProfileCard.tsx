import { classNames } from "shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import styles from "./ProfileCard.module.scss";

interface ProfileCard {
  className?: string;
}

const ProfileCard = (props: ProfileCard) => {
  const { className } = props;
  const { t } = useTranslation("profile");

  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(styles.ProfileCard, {}, [className])}>
      <div className={styles.header}>
        <Text title={t("Профиль")} />
        <Button theme={ThemeButton.OUTLINE} className={styles.editBtn}>
          {t("Редактировать")}
        </Button>
      </div>
      <div className={styles.data}>
        <Input value={data?.firstName} placeholder={t("Ваше имя")} className={styles.input} />
        <Input value={data?.lastName} placeholder={t("Ваша фамилия")} className={styles.input} />
      </div>
    </div>
  );
};

export default ProfileCard;
