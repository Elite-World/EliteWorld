import { companyInfo } from './company-info';

const features = {
  search: true,
  mode: true,
  user: true,
  language: true,
} as const;

const apps = {
  landing: true,
  education: true,
  immigration: true,
  coursehub: false,
} as const;

export const baseSiteConfig = {
  en: {
    name: companyInfo.en.name,
    description: companyInfo.en.description,
    url: companyInfo.en.url,
    contact: {
      address: companyInfo.en.address,
      phone: companyInfo.en.phone,
      email: companyInfo.en.email,
      whatsapp: companyInfo.en.whatsapp,
      wechat: companyInfo.en.wechat,
    },
    social: companyInfo.en.social,
    features,
    apps,
  },
  zh: {
    name: companyInfo.zh.name,
    description: companyInfo.zh.description,
    url: companyInfo.zh.url,
    contact: {
      address: companyInfo.zh.address,
      phone: companyInfo.zh.phone,
      email: companyInfo.zh.email,
      whatsapp: companyInfo.zh.whatsapp,
      wechat: companyInfo.zh.wechat,
    },
    social: companyInfo.zh.social,
    features,
    apps,
  }
} as const;
