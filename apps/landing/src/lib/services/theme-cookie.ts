import { cookies } from 'next/headers';
import { THEME_COOKIE_NAME } from './theme-cookie-constants';

export async function getThemeFromCookie(): Promise<'daisy' | 'ios' | null> {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE_NAME);
  return (theme?.value as 'daisy' | 'ios') || null;
}
