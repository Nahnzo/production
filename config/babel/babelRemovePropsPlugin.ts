import { PluginItem } from "@babel/core";

export default function (): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbidden = state.opts || [];
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (Array.isArray(forbidden) && forbidden.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
