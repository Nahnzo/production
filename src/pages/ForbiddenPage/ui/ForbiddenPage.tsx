import { useTranslation } from "react-i18next";
import Page from "widgets/Page/Page";

function ForbiddenPage() {
  const { t } = useTranslation("about");
  return <Page>{t("У вас нет доступа к этой странице")}</Page>;
}

export default ForbiddenPage;
