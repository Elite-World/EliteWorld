export const IS_DEV = process.env.NODE_ENV === 'development';

export const GATEWAY_URLS = {
  landing: IS_DEV ? 'http://localhost:3000' : 'https://www.eliteworld.top',
  immigration: IS_DEV ? 'http://localhost:3001' : 'https://immi.eliteworld.top',
  education: IS_DEV ? 'http://localhost:3002' : 'https://edu.eliteworld.top',
  coursehub: IS_DEV ? 'http://localhost:3003' : 'https://coursehub.eliteworld.top',
} as const;

export const buildNavGateway = (apps: Record<string, boolean>, locale: string = 'en') => {
  const isZh = locale === 'zh';
  return {
    ...(apps.landing
      ? {
          main: {
            id: 'main',
            name: 'ELITE',
            label: isZh ? '公司主页' : 'MAIN',
            href: GATEWAY_URLS.landing,
          },
        }
      : {}),
    ...(apps.immigration
      ? {
          immi: {
            id: 'immi',
            name: 'ELITE IMMI',
            label: isZh ? '环球移居' : 'IMMIGRATION',
            href: GATEWAY_URLS.immigration,
          },
        }
      : {}),
    ...(apps.education
      ? {
          edu: {
            id: 'edu',
            name: 'ELITE EDU',
            label: isZh ? '海外教育' : 'EDUCATION',
            href: GATEWAY_URLS.education,
          },
        }
      : {}),
    ...(apps.coursehub
      ? {
          coursehub: {
            id: 'coursehub',
            name: 'CourseHub',
            label: isZh ? '课程' : 'COURSEHUB',
            href: GATEWAY_URLS.coursehub,
          },
        }
      : {}),
  } as const;
};
