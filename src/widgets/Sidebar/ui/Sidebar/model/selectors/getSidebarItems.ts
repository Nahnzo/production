import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "shared/assets/icons/article-20-20.svg";
import { SidebarItemType } from "../types/sidebar";

// eslint-disable-next-line consistent-return
export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      icon: MainIcon,
      text: "Главная",
    },
    {
      path: RoutePath.about,
      icon: AboutIcon,
      text: "О сайте",
    },
  ];
  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + String(userData?.id),
        icon: ProfileIcon,
        text: "Профиль",
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        icon: ArticleIcon,
        text: "Статьи",
        authOnly: true,
      }
    );
    return sidebarItemsList;
  }
});
