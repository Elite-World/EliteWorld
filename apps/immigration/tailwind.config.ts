import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/config/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", // Include shared UI package
    "../../packages/web-shared/src/**/*.{js,ts,jsx,tsx,mdx}", // Include web-shared package
  ],
};

export default config;
