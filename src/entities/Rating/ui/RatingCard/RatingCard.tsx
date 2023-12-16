import { classNames } from "shared/lib/classNames/classNames";
import { HStack, VStack } from "shared/ui/Stack";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ThemeButton } from "shared/ui/Button/Button";
import StartRating from "shared/ui/StarRating/StartRating";
import Text from "shared/ui/Text/Text";
import Card from "shared/ui/Card/Card";
import Modal from "shared/ui/Modal/Modal";
import Input from "shared/ui/Input/Input";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "shared/ui/Drawer/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starCount: number) => void;
  onAccept?: (starCount: number, feedback?: string) => void;
  rate?: number;
}

const RatingCard = memo((props: RatingCardProps) => {
  const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title, rate = 0 } = props;

  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");

  const onSelectStar = useCallback(
    (selectedStarsCount: number) => {
      setIsModalOpen(true);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);
  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount);
  }, [onAccept, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input value={feedback} onChange={setFeedback} placeholder={t("Ваш отзыв")} />
    </>
  );

  return (
    <Card className={classNames("", {}, [className])} max>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t("Спасибо за оценку!") : title} />
        <StartRating size={40} onSelect={onSelectStar} selectedStars={starsCount} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap="32" max>
            {modalContent}
            <HStack gap="16" max justify="end">
              <Button theme={ThemeButton.OUTLINE_RED} onClick={cancelHandler}>
                {t("Закрыть")}
              </Button>
              <Button onClick={acceptHandler}>{t("Отправить")}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack gap="32">
            {modalContent}
            <Button onClick={acceptHandler} size={ButtonSize.L} fullWidth>
              {t("Отправить")}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});

export default RatingCard;
