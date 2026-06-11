import { SecurityPage } from '@/components/layouts/SecurityPage';

const securityContent = `
# Security & Compliance

At EliteWorld, we utilize military-grade encryption to protect your sensitive data.

## 1. Data Encryption
All data is encrypted in transit using TLS 1.3 and at rest using AES-256.

## 2. Infrastructure Security
Our platform runs on a secure, isolated cloud infrastructure with 24/7 monitoring.

## 3. Compliance
We adhere to strict international privacy standards including GDPR and CCPA.
`;

const securityContentZh = `
# 安全与合规

在 EliteWorld，我们采用军用级加密技术来保护您的敏感数据。

## 1. 数据加密
所有传输中的数据均使用 TLS 1.3 加密，静态数据使用 AES-256 加密。

## 2. 基础设施安全
我们的平台运行在安全的隔离云基础设施上，提供 24/7 全天候监控。

## 3. 合规性
我们遵守严格的国际隐私标准，包括 GDPR 和 CCPA。
`;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SecurityPage content={locale === 'zh' ? securityContentZh : securityContent} />;
}
