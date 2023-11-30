import { classNames } from "shared/lib/classNames/classNames";
import VStack from "shared/ui/Stack/VStack/VStack";
import Page from "widgets/Page/Page";
import { EditableProfileCard } from "features/editableProfileCard";
import { useParams } from "react-router-dom";
import Text from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ProfilePageProps {
  className?: string;
}

function ProfilePage(props: ProfilePageProps) {
  const { className } = props;
  const { t } = useTranslation("profile");
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Text text={t("Профиль не найден")} />;
  }
  return (
    <Page className={classNames("", {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
}

export default ProfilePage;
