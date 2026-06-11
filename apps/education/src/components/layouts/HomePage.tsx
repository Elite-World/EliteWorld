'use client';

import { Article } from '@repo/domain';
import { useThemeStore, useDevStore } from '@repo/domain';
import { ArticleCard } from '@repo/domain';

import { cn } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/education/site-config';
import Image from 'next/image';
// import { useUnsplashImage } from '@repo/domain';
import {

  MapPin,
  ArrowRight,
  Trophy,
  Building2,
} from 'lucide-react';
import Link from 'next/link';

import { getNavGateway } from '@repo/apps-config/education/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';

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

interface HomePageProps {
  articles?: Article[];
  tips?: Article[];
  locale?: string;
}


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

export function HomePage({ articles, tips = [], locale }: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';
  const navGateway = getNavGateway(locale);

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
        subtitle={
          <em>
            <strong>{isZh ? '敢于梦想' : 'Dream Big'}</strong> | {isZh ? '留学与移民的专业指导' : 'Expert Guidance for Study and Immigration'}
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
        className="py-24 bg-linear-to-b from-transparent to-gray-50 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-16',
              'bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
            )}
          >
            {isZh ? '我们的全球影响力' : 'Our Global Impact'}
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1000+',
                label: isZh ? '成功案例' : 'Success Stories',
                description: isZh ? '帮助学生进入全球顶尖学府' : 'Students placed in top institutions worldwide',
              },
              {
                number: '50+',
                label: isZh ? '合作大学' : 'Partner Universities',
                description: isZh ? '与领先院校直接建立合作关系' : 'Direct partnerships with leading institutions',
              },
              {
                number: '98%',
                label: isZh ? '成功率' : 'Success Rate',
                description: isZh ? '签证和入学申请的成功保证' : 'Visa and admission application success',
              },
              {
                number: '10+',
                label: isZh ? '年经验' : 'Years Experience',
                description: isZh ? '十余年卓越教育咨询经验' : 'Decade of excellence in education consulting',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  'text-center p-8 rounded-2xl transition-all duration-300 border',
                  'hover:transform hover:-translate-y-1',
                  isDark
                    ? 'bg-[#1A1A1A] hover:bg-[#222] border-white/5 hover:border-white/10'
                    : 'bg-white hover:bg-white border-gray-100 shadow-sm hover:shadow-xl',
                )}
              >
                <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p
                  className={cn(
                    'text-sm',
                    isDark ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2
                className={cn(
                  'text-4xl font-bold mb-4 text-[#010022] dark:text-white',
                )}
              >
                {isZh ? '深度解析' : 'Latest Insights'}
              </h2>
              <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mb-6" />
              <p
                className={cn(
                  'max-w-2xl',
                  isDark ? 'text-gray-400' : 'text-gray-600',
                )}
              >
                {isZh ? '获取国际教育的最新新闻、指南和提示。' : 'Stay updated with the latest news, guides, and tips for your international education journey.'}
              </p>
            </div>
            <Link
              href="/insights"
              className={cn(
                'inline-flex items-center space-x-2 mt-6 md:mt-0 font-semibold',
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700',
                'transition-colors'
              )}
            >
              <span>{isZh ? '查看所有文章' : 'View all articles'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles?.slice(0, 3).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                basePath="/insights"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Guides Section */}
      {tips.length > 0 && (
        <section className="py-24 bg-linear-to-b from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2
                  className={cn(
                    'text-4xl font-bold mb-4 text-[#010022] dark:text-white',
                  )}
                >
                  {isZh ? '干货分享' : 'Tips & Guides'}
                </h2>
                <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mb-6" />
                <p
                  className={cn(
                    'max-w-2xl',
                    isDark ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {isZh ? '可操作的建议，助您顺利完成申请并轻松过渡。' : 'Actionable advice to help you ace your applications and transition smoothly.'}
                </p>
              </div>
              <Link
                href="/tips"
                className={cn(
                  'inline-flex items-center space-x-2 mt-6 md:mt-0 font-semibold',
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700',
                  'transition-colors'
                )}
              >
                <span>{isZh ? '查看所有干货' : 'View all tips'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tips.slice(0, 3).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  basePath="/tips"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {showHiddenElements && (
        <section id="team" className="py-24">
          <div className="container mx-auto px-4">
            <h2
              className={cn(
                'text-4xl font-bold text-center mb-4 text-[#010022] dark:text-white',
              )}
            >
              {isZh ? '认识我们的教育专家' : 'Meet Our Education Experts'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
            <p
              className={cn(
                'text-center max-w-2xl mx-auto mb-16',
                isDark ? 'text-gray-400' : 'text-gray-600',
              )}
            >
              {isZh ? '我们经验丰富的顾问致力于在您教育之旅的每一步提供指导。' : 'Our experienced consultants are dedicated to guiding you through every step of your educational journey.'}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Evelyn Vance',
                  role: isZh ? '学术总监' : 'Academic Director',
                  image: '/images/team/evelyn-vance.png',
                  speciality: isZh ? '战略规划与研究' : 'Strategic Planning & Research',
                },
                {
                  name: 'James Miller',
                  role: isZh ? '招生专家' : 'Admissions Specialist',
                  image: '/images/team/james-miller.png',
                  speciality: isZh ? '常春藤盟校与牛剑' : 'Ivy League & Oxbridge',
                },
                {
                  name: 'Grace Tan',
                  role: isZh ? '写作顾问' : 'Writing Consultant',
                  image: '/images/team/grace-tan.png',
                  speciality: isZh ? '个人陈述与文书' : 'Personal Statements & Essays',
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
                    'hover:transform hover:-translate-y-1',
                    isDark ? 'bg-gray-800' : 'bg-white shadow-lg',
                    'h-full',
                  )}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p
                      className={cn(
                        'text-sm mb-2 font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400',
                      )}
                    >
                      {member.role}
                    </p>
                    <p
                      className={cn(
                        'text-sm',
                        isDark ? 'text-gray-400' : 'text-gray-500',
                      )}
                    >
                      {member.speciality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Universities Showcase */}
      <section className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">{isZh ? '全球精英' : 'Global Elite'}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                {isZh ? '顶尖排名' : 'Top Ranked'} <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{isZh ? '学府' : 'Institutions'}</span>
              </h2>
            </div>
            <Link
              href="/ranking"
              className={cn(
                "group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                isDark ? "bg-white/5 hover:bg-white/10 text-white" : "bg-white border border-gray-100 hover:border-blue-500/30 text-gray-900 shadow-sm"
              )}
            >
              {isZh ? '查看完整排名' : 'View Full Rankings'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rank: 1,
                name: "Massachusetts Institute of Technology (MIT)",
                country: "USA",
                image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600",
                logo: "/images/img_transparent/massachusetts-institute-of-technology.png",
                score: "100.0"
              },
              {
                rank: 2,
                name: "Imperial College London",
                country: "United Kingdom",
                image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=600",
                logo: "/images/img_transparent/imperial-college-london.png",
                score: "98.5"
              },
              {
                rank: 3,
                name: "University of Oxford",
                country: "United Kingdom",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg/1280px-Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg",
                logo: "/images/img_transparent/university-of-oxford.png",
                score: "96.9"
              }
            ].map((uni, idx) => (
              <Link key={idx} href={`/universities/${uni.country.toLowerCase().replace(/ /g, '-')}/${uni.name.toLowerCase().replace(/ /g, '-')}`} className="group relative flex flex-col h-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-56 shrink-0 w-full overflow-hidden">
                  <Image src={uni.image} alt={uni.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <span className="text-white font-black text-sm">#{uni.rank}</span>
                  </div>
                </div>
                <div className="p-8 relative flex-1 flex flex-col">
                  <div className="absolute -top-12 right-8 w-20 h-20 bg-white dark:bg-[#0a0a0a] rounded-3xl p-3 shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <Image src={uni.logo} alt="Logo" width={60} height={60} className="object-contain transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{isZh ? (uni.country === 'USA' ? '美国' : uni.country === 'United Kingdom' ? '英国' : uni.country) : uni.country}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 line-clamp-2 leading-tight">{isZh ? (uni.name === 'Massachusetts Institute of Technology (MIT)' ? '麻省理工学院 (MIT)' : uni.name === 'Imperial College London' ? '伦敦帝国学院' : uni.name === 'University of Oxford' ? '牛津大学' : uni.name) : uni.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{isZh ? '得分' : 'Score'} {uni.score}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              {isZh ? '按' : 'Explore by'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{isZh ? '目的地' : 'Destination'}</span>{isZh ? '探索' : ''}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-widest max-w-lg mx-auto">
              {isZh ? '在全球领先的教育中心找到您完美的学术家园。' : 'Find your perfect academic home in the world\'s leading educational hubs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Main Feature - USA */}
            <Link href="/destinations/usa" className="md:col-span-8 group relative rounded-[3rem] overflow-hidden min-h-[400px]">
              <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200" alt="Study in USA" fill className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">{isZh ? '美国' : 'United States'}</h3>
                <p className="text-base font-medium text-gray-300 max-w-md mb-8 leading-relaxed">{isZh ? '常春藤盟校和全球最具创新力研究机构的所在地。' : 'Home to the Ivy League and the world\'s most innovative research institutions.'}</p>
                <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 group-hover:text-blue-300 transition-colors">
                  {isZh ? '探索 50+ 所院校' : 'Explore 50+ Institutions'} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            <div className="md:col-span-4 flex flex-col gap-6">
              {/* Secondary - UK */}
              <Link href="/destinations/uk" className="flex-1 group relative rounded-[3rem] overflow-hidden min-h-[280px]">
                <Image src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600" alt="Study in UK" fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-1" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{isZh ? '英国' : 'United Kingdom'}</h3>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors">
                    {isZh ? '探索' : 'Explore'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              
              {/* Secondary - Australia */}
              <Link href="/destinations/australia" className="flex-1 group relative rounded-[3rem] overflow-hidden min-h-[280px]">
                <Image src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=600" alt="Study in Australia" fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{isZh ? '澳大利亚' : 'Australia'}</h3>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors">
                    {isZh ? '探索' : 'Explore'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
