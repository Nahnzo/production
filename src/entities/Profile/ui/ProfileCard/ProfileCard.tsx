import { Mods, classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import Text, { TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";
import Input from "shared/ui/Input/Input";
import Loader from "shared/ui/Loader/Loader";
import Avatar from "shared/ui/Avatar/Avatar";
import { HStack, VStack } from "shared/ui/Stack";
import { Profile } from "../../model/types/profile";
import styles from "./ProfileCard.module.scss";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeLastName?: (value?: string) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    onChangeFirstName,
    onChangeLastName,
    readonly,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(styles.ProfileCard, { [styles.loading]: true }, [className])}
      >
        <Loader />
      </HStack>
    );
  }
  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(styles.ProfileCard, {}, [className, styles.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }
  const mods: Mods = {
    [styles.editing]: !readonly,
  };

  return (
    <VStack gap="16" max className={classNames(styles.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify="center" max className={styles.avatarWrapper}>
          <Avatar src={data?.avatar} alt={t("Аватар пользователя")} />
        </HStack>
      )}
      <Input
        value={data?.firstName}
        placeholder={t("Ваше имя")}
        className={styles.input}
        onChange={onChangeFirstName}
        readonly={readonly}
        data-testid="ProfileCard.firstName"
      />
      <Input
        value={data?.lastName}
        placeholder={t("Ваша фамилия")}
        className={styles.input}
        onChange={onChangeLastName}
        readonly={readonly}
        data-testid="ProfileCard.lastName"
      />
      <Input
        value={data?.age}
        placeholder={t("Ваш возвраст")}
        className={styles.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t("Ваш город")}
        className={styles.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t("Вставьте ссылку на аватар")}
        className={styles.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t("Введите имя пользователя")}
        className={styles.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
        className={styles.input}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
        className={styles.input}
      />
    </VStack>
  );
};

export default ProfileCard;
