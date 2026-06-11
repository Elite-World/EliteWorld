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
  Users,
  Award,
  Globe,
  ShieldCheck,
  Zap,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { QRCode } from '@repo/domain';
import { useState, useEffect } from 'react';
import { getNavGateway } from '@repo/apps-config/landing/navbar-config';
import { HeroSection, NavigationItem, Button } from '@repo/ui';

// Add subdomain config at the top of the file
// const subdomains = {
//   immigration: 'https://immi.eliteworld.top',
//   education: 'https://edu.eliteworld.top'
// } as const;

// Loading animation component
// function LoadingAnimation() {
//   return (
//     <div className="relative w-24 h-24">
//       <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
//       <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
//     </div>
//   );
// }

// Company loading page
// function CompanyLoadingPage() {
//   const isDark = useThemeStore((state) => state.isDark);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 20);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       className={cn(
//         'fixed inset-0 z-50 flex flex-col items-center justify-center',
//         'transition-colors duration-300',
//         isDark ? 'bg-black text-white' : 'bg-white text-black',
//       )}
//     >
//       {/* Company Logo */}
//       <div className="mb-8 text-4xl font-bold tracking-tight">
//         {siteConfig.name}
//       </div>

//       {/* Loading Animation */}
//       <LoadingAnimation />

//       {/* Progress Bar */}
//       <div className="w-64 h-1 mt-8 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-blue-500 transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       {/* Loading Text */}
//       <div
//         className={cn(
//           'mt-4 text-sm font-medium',
//           isDark ? 'text-gray-400' : 'text-gray-600',
//         )}
//       >
//         Loading... {progress}%
//       </div>
//     </div>
//   );
// }

// interface HomePageProps {
//   categories: Category[];
//   articles: Article[];
// }

// Define the social media links with proper icon types
const socialLinks = [
  { icon: Linkedin, href: siteConfig.social.linkedin },
  { icon: Twitter, href: siteConfig.social.twitter },
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
] as const;

// Add skeleton loading states
// function ArticleListSkeleton() {
//   return (
//     <div className="space-y-4">
//       {[...Array(3)].map((_, i) => (
//         <div key={i} className="animate-pulse">
//           <div className="h-4 bg-gray-200 rounded w-3/4" />
//           <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export function HomePage({ categories, articles }: HomePageProps) {
export function HomePage({ locale }: { locale?: string }) {
  const [mounted, setMounted] = useState(false);
  const _isDark = useThemeStore((state) => state.isDark);
  const isDark = mounted ? _isDark : false;
  const navGateway = getNavGateway(locale);
  const isZh = locale === 'zh';

  useEffect(() => {
    setMounted(true);
  }, []);

  // const [isLoading, setIsLoading] = useState(false);
  // Disabled for SEO
  /*
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <CompanyLoadingPage />;
  }
  */

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={siteConfig.name}
        backgroundImage={siteConfig.ogImage}
        subtitle={
          <em>
            <strong>{isZh ? '梦想起航' : 'Dream Big'}</strong> | {isZh ? '专业的留学与移民指导' : 'Expert Guidance for Study and Immigration'}
          </em>
        }
      >
        {Object.values(navGateway)
          .filter((item) => item.name !== siteConfig.name)
          .map((button: NavigationItem, index: number) => (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                // Base styles
                'px-8 py-3 rounded-lg text-lg font-medium text-center',
                'text-white border-2 border-white/30',
                // Glass effect
                'backdrop-blur-sm bg-white/5',
                // Hover effects
                'hover:bg-white/15 hover:border-white/50',
                // Transitions
                'transition-all duration-300',
                // Transform on hover
                'hover:scale-105',
                // Subtle shadow
                'shadow-[0_0_15px_rgba(255,255,255,0.1)]',
                'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
                'w-48'
              )}
            >
              {button.label}
            </a>
          ))}
      </HeroSection>

      {/* Achievements Section */}
      <section
        id="about"
        className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
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
              {isZh ? '为您搭建国际学术过渡与定居的黄金标准。' : 'Setting the gold standard for international academic transition and settlement.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '5,000+',
                label: isZh ? '成功案例' : 'Success Stories',
                description: isZh ? '进入全球顶尖学府精英人才。' : 'Elite placement in Tier-1 Global Institutions.',
                icon: Users,
              },
              {
                number: '120+',
                label: isZh ? '合作大学' : 'Partner Universities',
                description: isZh ? '直接机构对接与优先处理。' : 'Direct institutional access & priority processing.',
                icon: Globe,
              },
              {
                number: '99%',
                label: isZh ? '成功率' : 'Success Rate',
                description: isZh ? '精准签证与录取方案。' : 'Precision-engineered visa & admission protocols.',
                icon: ShieldCheck,
              },
              {
                number: '15+',
                label: isZh ? '年卓越经验' : 'Years Excellence',
                description: isZh ? '高绩效咨询的优良传统。' : 'A legacy of high-performance consulting.',
                icon: Award,
              },
            ].map((stat, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
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
              {isZh ? '我们经验丰富的顾问致力于为您全球过渡的每个阶段进行架构。' : 'Our seasoned consultants are dedicated to architecting every phase of your global transition.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: isZh ? '高级学术合伙人' : 'Senior Academic Partner',
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
                speciality: isZh ? '常春藤录取专家' : 'Ivy League Admissions',
              },
              {
                name: 'Michael Zhang',
                role: isZh ? '移民主管' : 'Head of Migration',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
                speciality: isZh ? '一级签证方案专家' : 'Tier-1 Visa Protocols',
              },
              {
                name: 'Emma Liu',
                role: isZh ? '战略顾问' : 'Strategic Advisor',
                image:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600',
                speciality: isZh ? '全球职业规划专家' : 'Global Career Planning',
              },
            ].map((member, index) => (
              <div
                key={index}
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
                </div>

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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-6">
              {isZh ? '准备好规划您的' : 'Ready to architect'} <br /> {isZh ? '' : 'your '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '未来了吗？' : 'Future?'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {isZh ? '启动与我们合伙人的保密咨询。您的全球之旅由此开始。' : 'Initiate a confidential consultation with our partner faculty. Your journey to global status begins here.'}
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="animate-fade-in">
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
                {isZh ? '联系我们的全球响应团队。我们在所有主要学术管辖区提供多语言支持。' : 'Connect with our Global Response Team. We provide multilingual support across all major academic jurisdictions.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-10 mb-12 pb-12 border-b border-gray-100 dark:border-white/5">
                {[
                  {
                    icon: MapPin,
                    title: isZh ? '全球总部' : 'Global HQ',
                    label: siteConfig.contact.address,
                  },
                  {
                    icon: Phone,
                    title: isZh ? '安全专线' : 'Secure Line',
                    label: siteConfig.contact.phone,
                  },
                  {
                    icon: Mail,
                    title: isZh ? '注册邮箱' : 'Registry Email',
                    label: siteConfig.contact.email,
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        {contact.title}
                      </p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-relaxed">
                        {contact.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-6">
                {socialLinks.map((social, index) => (
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
            </div>

            {/* Verification & Access */}
            <div className="h-fit @container bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-4xl md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden">
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
                          siteConfig.contact.whatsapp.qr ||
                          '/qr/whatsapp-qr.png'
                        }
                        alt="WhatsApp QR Code"
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
                          siteConfig.contact.wechat.qr || '/qr/wechat-qr.png'
                        }
                        alt="WeChat QR Code"
                        title="WeChat"
                        description=""
                        isDark={isDark}
                        className="bg-transparent! shadow-none! p-0!"
                      />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-6 text-center">
                      {isZh ? '扫码获取支持' : 'Scan for support'}: {siteConfig.contact.wechat.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
