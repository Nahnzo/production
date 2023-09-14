import type { Preview } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/styleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/themeDecorator/ThemeDecorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [(Story) => Story(StyleDecorator), (Story) => Story(ThemeDecorator("DARK"))],
};

export default preview;
