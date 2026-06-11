'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '../utils';
import {
  Globe,
  ShieldCheck,
  Zap,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

import { useLanguageStore } from '@repo/domain';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  className?: string;
  siteConfig?: {
    name: string;
    description?: string;
    sections?: FooterSection[];
    social?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
  showHiddenElements?: boolean;
}

export function Footer({
  className,
  siteConfig = {
    name: 'EliteWorld',
  },
  showHiddenElements = false,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  const defaultSections: FooterSection[] = [
    {
      title: isZh ? '平台服务' : 'Platform',
      links: [
        { label: isZh ? '深度解析' : 'Intelligence', href: '#' },
        { label: isZh ? '全球名校录' : 'Global Registry', href: '#' },
        { label: isZh ? '安全保障协议' : 'Security Protocols', href: '#' },
        { label: isZh ? 'API 接口对接' : 'API Access', href: '#' },
      ],
    },
    {
      title: isZh ? '服务资源' : 'Resources',
      links: [
        { label: isZh ? '说明文档' : 'Documentation', href: '#' },
        { label: isZh ? '帮助中心' : 'Help Center', href: '#' },
        { label: isZh ? '交流社区' : 'Community', href: '#' },
        { label: isZh ? '服务状态' : 'Status', href: '#' },
      ],
    },
    {
      title: isZh ? '关于我们' : 'Company',
      links: [
        { label: isZh ? '关于寰宇精英' : 'About', href: '#' },
        { label: isZh ? '加入我们' : 'Careers', href: '#' },
        { label: isZh ? '媒体报道' : 'Press', href: '#' },
        { label: isZh ? '联系我们' : 'Contact', href: '#' },
      ],
    },
  ];

  const sections = siteConfig.sections || defaultSections;
  const description = siteConfig.description || (isZh
    ? '寰宇精英拥有全球前沿的高等教育与海外规划信息，提供专业、高效的名校申请及全球身份协调解决方案。'
    : "The world's most advanced platform for global intelligence and elite academic coordination.");

  return (
    <footer
      className={cn(
        'bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 pt-20 pb-12 transition-colors duration-300',
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHiddenElements && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="p-2.5 rounded-2xl bg-[#0a0a0a] dark:bg-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                <Globe className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="font-sans font-black text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors tracking-tighter uppercase">
                {siteConfig.name.split(/(?=[A-Z])/).map((part, i) => (
                  <span
                    key={i}
                    className={
                      i === 1 ? 'text-blue-600 dark:text-blue-500' : ''
                    }
                  >
                    {part.toUpperCase()}
                  </span>
                ))}
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
              {description}
            </p>

            <div className="flex items-center gap-4 mt-8">
              {siteConfig.social?.twitter && (
                <Link
                  href={siteConfig.social.twitter}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
              )}
              {siteConfig.social?.github && (
                <Link
                  href={siteConfig.social.github}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                </Link>
              )}
              {siteConfig.social?.linkedin && (
                <Link
                  href={siteConfig.social.linkedin}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
              {isZh ? '权威资质' : 'Accreditations'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-600/5 dark:bg-blue-500/10 border border-blue-600/10 dark:border-blue-500/20">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                  {isZh ? '官方持牌顾问' : 'Licensed Agent'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-600/5 dark:bg-purple-500/10 border border-purple-600/10 dark:border-purple-500/20">
                <Zap className="w-4 h-4 text-purple-600 dark:text-purple-500" />
                <span className="text-[10px] font-black text-purple-600 dark:text-purple-500 uppercase tracking-widest">
                  {isZh ? '全球战略合作伙伴' : 'Global Partner'}
                </span>
              </div>
            </div>
          </div>
        </div>
        )}

        <div className="pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            © {currentYear} {siteConfig.name} | {isZh ? '版权所有' : 'ALL RIGHTS RESERVED.'}
          </p>
          <div className="flex gap-10">
            {[
              { label: isZh ? '隐私政策' : 'Privacy', href: '/privacy-policy' },
              { label: isZh ? '服务条款' : 'Terms', href: '/terms-of-service' },
              { label: isZh ? '安全中心' : 'Security', href: '/security' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-black text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 uppercase tracking-[0.2em] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
