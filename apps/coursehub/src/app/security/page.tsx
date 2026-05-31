import { SecurityPage } from '@/components/SecurityPage';

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

export default function Page() {
  return <SecurityPage content={securityContent} />;
}
