import { createSelector } from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";

export const getPositionScroll = (state: StateScheme) => state.positionScroll.scroll;
export const getPositionScrollByPath = createSelector(
  getPositionScroll,
  (state: StateScheme, path: string) => path,
  (scroll, path) => scroll[path] || 0
);
