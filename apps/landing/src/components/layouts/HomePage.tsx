'use client';

// import { Article, Category } from '@repo/domain';
import { useThemeStore, cn } from '@repo/domain';
// import { Card } from '../ui/Card'; // Card might stay local or go shared? Assuming shared based on prompt? Card is in web-shared but let's check.
// Card is in web-shared/ui/Card.tsx as seen in file listing.
// import { ArticleCard } from '@repo/domain'; // ArticleCard is shared
import { siteConfig } from '@repo/apps-config/landing/site-config';
import Image from 'next/image';
// import { useUnsplashImage } from '@repo/domain';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { QRCode } from '@repo/domain';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNavGateway } from '@repo/apps-config/landing/navbar-config';
import {
  getHomeStats,
  getHomeTeam,
} from '@repo/apps-config/landing/home-config';
import { HeroSection, NavigationItem, Button } from '@repo/ui';
import { appOgImage } from '@repo/apps-config/base/company-info';

export function HomePage({ locale: propsLocale }: { locale?: string }) {
  const [mounted, setMounted] = useState(false);
  const _isDark = useThemeStore((state) => state.isDark);
  const isDark = mounted ? _isDark : false;
  const { locale: paramsLocale } = useParams();
  const locale = (propsLocale || paramsLocale || 'en') as 'en' | 'zh';
  const isZh = locale === 'zh';
  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];
  const navGateway = getNavGateway(locale);

  // Define the social media links with proper icon types
  const socialLinks = [
    { icon: Linkedin, href: currentSiteConfig.social.linkedin },
    { icon: Twitter, href: currentSiteConfig.social.twitter },
    { icon: Instagram, href: currentSiteConfig.social.instagram },
    { icon: Facebook, href: currentSiteConfig.social.facebook },
  ] as const;

  // Background images for the landing hero matching the button IDs
  const HERO_BG_IMAGES = {
    main: appOgImage.landing,
    immi: appOgImage.immi,
    edu: appOgImage.edu,
    coursehub: appOgImage.coursehub,
  } as const;

  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.en.name,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset hover and slideshow states on scroll to prevent stuck active backgrounds
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setIsHovered(false);
        setHoveredButtonId(null);
        setCarouselIndex(0);
      }
      setHeroInView(scrolled < 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay slideshow for mobile and idle desktop screens (every 5 seconds)
  useEffect(() => {
    if (isHovered || !heroInView || gatewayButtons.length === 0) return;

    const interval = setInterval(() => {
      // Loop from 0 to N (0 = default background, 1..N = highlighted buttons)
      setCarouselIndex(
        (prevIndex) => (prevIndex + 1) % (gatewayButtons.length + 1),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, heroInView, gatewayButtons.length]);

  // Current active button ID (prioritizing active mouse hover)
  const currentButtonId = isHovered
    ? hoveredButtonId
    : carouselIndex === 0
      ? null
      : gatewayButtons[carouselIndex - 1]?.id || null;

  const activeBgImage = currentButtonId
    ? HERO_BG_IMAGES[currentButtonId as keyof typeof HERO_BG_IMAGES] ||
      currentSiteConfig.ogImage
    : currentSiteConfig.ogImage;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={currentSiteConfig.name}
        backgroundImage={activeBgImage}
        subtitle={
          <em>
            <strong>{isZh ? '梦想起航' : 'Dream Big'}</strong> |{' '}
            {isZh
              ? '专业的留学与移民指导'
              : 'Expert Guidance for Study and Immigration'}
          </em>
        }
      >
        {gatewayButtons.map((button: NavigationItem, index: number) => {
          const isActive = button.id === currentButtonId;
          return (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredButtonId(button.id);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredButtonId(null);
              }}
              className={cn(
                // Base styles
                'px-8 py-3 rounded-lg text-lg font-medium text-center',
                'text-white border-2 w-48 backdrop-blur-sm transition-all duration-300',
                // Highlight state matching hover preview
                isActive
                  ? 'bg-white/20 border-white scale-105 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                  : 'bg-white/5 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
              )}
            >
              {button.label}
            </a>
          );
        })}
      </HeroSection>

      {/* Achievements Section */}
      <section
        id="about"
        className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '卓越机构' : 'Institutional Excellence'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
              {isZh ? '我们的全球' : 'Our Global '}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '影响力' : 'Influence'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-widest max-w-lg mx-auto">
              {isZh
                ? '为您搭建国际学术过渡与定居的黄金标准。'
                : 'Setting the gold standard for international academic transition and settlement.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getHomeStats(isZh).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] hover:bg-gray-50 dark:hover:bg-white/8 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-xl dark:shadow-none"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  {isZh ? '顾问团队' : 'Consultancy Faculty'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
                {isZh ? '认识我们的专业' : 'Meet our expert'} <br />{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  {isZh ? '策略师' : 'Strategists'}
                </span>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium max-w-xs leading-relaxed">
              {isZh
                ? '我们经验丰富的顾问致力于为您全球过渡的每个阶段进行架构。'
                : 'Our seasoned consultants are dedicated to architecting every phase of your global transition.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {getHomeTeam(isZh).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-[2.5rem] overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all duration-500"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                      {member.role}
                    </p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/50 uppercase tracking-widest">
                      <Zap className="w-3 h-3 text-blue-600" />
                      {member.speciality}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-6">
              {isZh ? '准备好规划您的' : 'Ready to architect'} <br />{' '}
              {isZh ? '' : 'your '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '未来了吗？' : 'Future?'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {isZh
                ? '启动与我们合伙人的保密咨询。您的全球之旅由此开始。'
                : 'Initiate a confidential consultation with our partner faculty. Your journey to global status begins here.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button
              variant="hero"
              className="px-10 py-5 h-auto text-[10px]"
              rightIcon={
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              }
            >
              {isZh ? '预约咨询' : 'Schedule Consultation'}
            </Button>
            <Button
              variant="hero-outline"
              className="px-10 py-5 h-auto text-[10px]"
            >
              {isZh ? '获取简章' : 'Request Prospectus'}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
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
                    // activate will enable the external map direction following the link click
                    // href: isZh
                    //   ? `https://ditu.amap.com/search?query=${encodeURIComponent(currentSiteConfig.contact.address)}`
                    //   : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSiteConfig.contact.address)}`,
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
                      rel={
                        contact.isExternal ? 'noopener noreferrer' : undefined
                      }
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
                        className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                </div>
              )}
            </motion.div>

            {/* Verification & Access */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-fit @container bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8 md:mb-10">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                    {isZh ? '即时访问二维码' : 'Instant Access QR'}
                  </span>
                </div>

                <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 md:gap-10">
                  <div className="group">
                    <div className="bg-white dark:bg-black p-4 md:p-6 rounded-4xl border border-gray-100 dark:border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
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
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-6 text-center">
                      {isZh ? '扫码加密聊天' : 'Scan to chat encrypted'}
                    </p>
                  </div>
                  <div className="group">
                    <div className="bg-white dark:bg-black p-4 md:p-6 rounded-4xl border border-gray-100 dark:border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
