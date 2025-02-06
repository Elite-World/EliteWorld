import { IosTheme } from './ios';
import { DaisyTheme } from './daisy';

export const themes = {
  ios: IosTheme,
  daisy: DaisyTheme
} as const;

export type ThemeType = keyof typeof themes; 