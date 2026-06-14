'use client';;
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { QRCode } from '../shared/QRCode';

export default function ContactSection({
  isZh,
  currentSiteConfig,
  isDark,
  socialLinks,
}: {
  isZh: boolean;
  currentSiteConfig: any;
  isDark: boolean;
  socialLinks: any[];
}) {
  return (
    <section id="contact" className="py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '安全渠道' : 'Secure Channels'}
              </span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 max-w-sm">
              {isZh ? '启动' : 'Initiate'} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '直接联系' : 'Direct Contact'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium mb-12 max-w-md leading-relaxed">
              {isZh
                ? '联系我们的全球响应团队。我们在所有主要学术管辖区提供多语言支持。'
                : 'Connect with our Global Response Team. We provide multilingual support across all major academic jurisdictions.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-10 mb-12 pb-12 border-b border-gray-100 dark:border-white/5">
              {[
                {
                  icon: MapPin,
                  title: isZh ? '全球总部' : 'Global HQ',
                  label: currentSiteConfig.contact.address,
                  isExternal: true,
                },
                {
                  icon: Phone,
                  title: isZh ? '安全专线' : 'Secure Line',
                  label: currentSiteConfig.contact.phone,
                  href: `tel:${currentSiteConfig.contact.phone.replace(/[^0-9+]/g, '')}`,
                },
                {
                  icon: Mail,
                  title: isZh ? '注册邮箱' : 'Registry Email',
                  label: currentSiteConfig.contact.email,
                  href: `mailto:${currentSiteConfig.contact.email}`,
                },
              ].map((contact, index) => {
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        {contact.title}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {contact.label}
                      </p>
                    </div>
                  </>
                );

                return contact.href ? (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.isExternal ? '_blank' : undefined}
                    rel={contact.isExternal ? 'noopener noreferrer' : undefined}
                    className="flex flex-col gap-4 group cursor-pointer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index} className="flex flex-col gap-4">
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Social Channels */}
            {socialLinks.some(
              (social) => social.href && String(social.href).trim() !== '',
            ) && (
              <div className="flex items-center gap-6">
                {socialLinks
                  .filter(
                    (social) =>
                      social.href && String(social.href).trim() !== '',
                  )
                  .map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
              </div>
            )}
          </div>

          {/* Verification & Access */}
          <div
            className="h-fit @container bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden animate-in fade-in duration-500">
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32 transform-gpu will-change-transform" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8 md:mb-10">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  {isZh ? '即时访问二维码' : 'Instant Access QR'}
                </span>
              </div>

              <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 md:gap-10">
                <a
                  href={currentSiteConfig.contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-white dark:bg-black p-4 md:p-6 rounded-4xl border border-gray-100 dark:border-white/10 shadow-2xl transition group-hover:-translate-y-2">
                    <QRCode
                      src={
                        currentSiteConfig.contact.whatsapp.qr ||
                        '/qr/whatsapp-qr.webp'
                      }
                      alt={isZh ? 'WhatsApp 二维码' : 'WhatsApp QR Code'}
                      title="WhatsApp"
                      description=""
                      isDark={isDark}
                      className="bg-transparent! shadow-none! p-0!"
                    />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-6 text-center group-hover:text-blue-600 transition-colors">
                    {isZh ? '点击或扫码加密聊天' : 'Click or scan to chat encrypted'}
                  </p>
                </a>
                <div className="group">
                  <div className="bg-white dark:bg-black p-4 md:p-6 rounded-4xl border border-gray-100 dark:border-white/10 shadow-2xl transition group-hover:-translate-y-2">
                    <QRCode
                      src={
                        currentSiteConfig.contact.wechat.qr ||
                        '/qr/wechat-qr.webp'
                      }
                      alt={isZh ? '微信二维码' : 'WeChat QR Code'}
                      title={isZh ? '微信' : 'WeChat'}
                      description=""
                      isDark={isDark}
                      className="bg-transparent! shadow-none! p-0!"
                    />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-6 text-center">
                    {isZh ? '扫码获取支持' : 'Scan for support'}:{' '}
                    {currentSiteConfig.contact.wechat.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
