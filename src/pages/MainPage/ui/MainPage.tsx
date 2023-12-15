import { RatingCard } from "entities/Rating";
import { useTranslation } from "react-i18next";
import ListBox from "shared/ui/Popups/ui/ListBox/ListBox";
import { HStack } from "shared/ui/Stack";
import StartRating from "shared/ui/StarRating/StartRating";
import Page from "widgets/Page/Page";

function MainPage() {
  const { t } = useTranslation();

  return <Page>{t("Главная страница")}</Page>;
}

export default MainPage;
