import { StoryObj } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import "app/styles/index.scss";

export const ThemeDecorator = (story: (theme: Theme) => StoryObj) => story(Theme.DARK);
