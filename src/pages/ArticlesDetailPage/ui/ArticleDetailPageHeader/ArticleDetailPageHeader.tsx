import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "entities/Article/model/selectros/getArticleDetailsData";
import { HStack } from "shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailPageHeaderProps {
  className?: string;
}

const ArticleDetailPageHeader = memo((props: ArticleDetailPageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);
  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);
  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.articlesDetails}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("Назад к списку")}
      </Button>
      {canEdit && (
        <Button theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
          {t("Редактировать")}
        </Button>
      )}
    </HStack>
  );
});

export default ArticleDetailPageHeader;
