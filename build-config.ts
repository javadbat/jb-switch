import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-switch",
    path: "./lib/jb-switch.ts",
    outputPath: "./dist/jb-switch.js",
    external: ['jb-validation', 'jb-form', 'jb-core', 'jb-core/theme'],
    globals: {
      'jb-validation': "JBValidation",
      'jb-form': "JBForm",
      'jb-core': "JBCore",
      'jb-core/theme': "JBCoreTheme"
    },
    umdName: "JBSwitch",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-switch-react",
    path: "./react/lib/JBSwitch.tsx",
    outputPath: "./react/dist/JBSwitch.js",
    external: ["prop-types", "react", "jb-switch","jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "jb-switch": "JBSwitch",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
    },
    umdName: "JBSwitchReact",
    dir: "./react"
  },
];