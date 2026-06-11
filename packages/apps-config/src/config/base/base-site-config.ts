import { companyInfo } from './company-info';

export const baseSiteConfig = {
  name: companyInfo.name,
  description:companyInfo.description,
  url: companyInfo.url,
  contact: {
    address: companyInfo.address,
    phone: companyInfo.phone,
    email: companyInfo.email,
    whatsapp: companyInfo.whatsapp,
    wechat: companyInfo.wechat,
  },
  social: companyInfo.social,
  features: {
    search: true,
    mode: true,
    user: true,
    language: true,
  },
  apps: {
    landing: true,
    education: true,
    immigration: true,
    coursehub: false,
  },
} as const;
