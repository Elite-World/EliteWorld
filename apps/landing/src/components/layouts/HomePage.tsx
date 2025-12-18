'use client';

import { Article, Category } from '@repo/web-shared';
import { useThemeStore } from '@repo/web-shared';
import { Card } from '../ui/Card'; // Card might stay local or go shared? Assuming shared based on prompt? Card is in web-shared but let's check.
// Card is in web-shared/ui/Card.tsx as seen in file listing.
import { ArticleCard } from '@repo/web-shared'; // ArticleCard is shared
import { cn } from '@repo/web-shared';
import { useEffect, useState } from 'react';
import { siteConfig } from '@repo/web-shared/config/landing/site-config';
import Image from 'next/image';
import { useUnsplashImage } from '@repo/web-shared';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { QRCode } from '@repo/web-shared';

import { navGateway } from '@repo/web-shared/config/landing/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';

// Add subdomain config at the top of the file
// const subdomains = {
//   immigration: 'https://immi.eliteworld.top',
//   education: 'https://edu.eliteworld.top'
// } as const;

// Loading animation component
function LoadingAnimation() {
  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}

// Company loading page
function CompanyLoadingPage() {
  const isDark = useThemeStore((state) => state.isDark);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center',
        'transition-colors duration-300',
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      )}
    >
      {/* Company Logo */}
      <div className="mb-8 text-4xl font-bold tracking-tight">
        {siteConfig.name}
      </div>

      {/* Loading Animation */}
      <LoadingAnimation />

      {/* Progress Bar */}
      <div className="w-64 h-1 mt-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div
        className={cn(
          'mt-4 text-sm font-medium',
          isDark ? 'text-gray-400' : 'text-gray-600'
        )}
      >
        Loading... {progress}%
      </div>
    </div>
  );
}

interface HomePageProps {
  categories: Category[];
  articles: Article[];
}

// Define the social media links with proper icon types
const socialLinks = [
  { icon: Linkedin, href: siteConfig.social.linkedin },
  { icon: Twitter, href: siteConfig.social.twitter },
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
] as const;

// Add skeleton loading states
function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
        </div>
      ))}
    </div>
  );
}

export function HomePage({ categories, articles }: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);

  const [isLoading, setIsLoading] = useState(false);
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
            <strong>Dream Big</strong> | Expert Guidance for Study and
            Immigration
          </em>
        }
      >
        {Object.values(navGateway)
          .filter((item) => item !== navGateway.main)
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
                'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              )}
            >
              {button.label}
            </a>
          ))}
      </HeroSection>

      {/* Achievements Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-16',
              'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'
            )}
          >
            Our Global Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1000+',
                label: 'Success Stories',
                description: 'Students placed in top institutions worldwide',
              },
              {
                number: '50+',
                label: 'Partner Universities',
                description: 'Direct partnerships with leading institutions',
              },
              {
                number: '98%',
                label: 'Success Rate',
                description: 'Visa and admission application success',
              },
              {
                number: '10+',
                label: 'Years Experience',
                description: 'Decade of excellence in education consulting',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  'text-center p-8 rounded-2xl transition-all duration-300',
                  'hover:transform hover:-translate-y-1',
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-blue-50 shadow-lg'
                )}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p
                  className={cn(
                    'text-sm',
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  )}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24">
        <div className="container mx-auto px-4">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-6',
              isDark ? 'text-gray-100' : 'text-gray-800'
            )}
          >
            Meet Our Expert Team
          </h2>
          <p
            className={cn(
              'text-center max-w-2xl mx-auto mb-16',
              isDark ? 'text-gray-400' : 'text-gray-600'
            )}
          >
            Our experienced consultants are dedicated to guiding you through
            every step of your educational journey
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Education Consultant',
                image: 'https://avatar.iran.liara.run/public',
                speciality: 'UK & US Universities',
              },
              {
                name: 'Michael Zhang',
                role: 'Immigration Specialist',
                image: 'https://avatar.iran.liara.run/public',
                speciality: 'Visa & Immigration',
              },
              {
                name: 'Emma Liu',
                role: 'Career Advisor',
                image: 'https://avatar.iran.liara.run/public',
                speciality: 'Career Planning',
              },
            ].map((member, index) => (
              <div
                key={index}
                className={cn(
                  'flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
                  'hover:transform hover:-translate-y-1',
                  isDark ? 'bg-gray-800' : 'bg-white shadow-lg',
                  'h-full'
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
                      'text-sm mb-2',
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    )}
                  >
                    {member.role}
                  </p>
                  <p
                    className={cn(
                      'text-sm',
                      isDark ? 'text-gray-400' : 'text-gray-600'
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Book a free consultation with our experts and take the first step
            towards your international education goals
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Consultation
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className={cn(
                  'text-4xl font-bold mb-6',
                  isDark ? 'text-gray-100' : 'text-gray-800'
                )}
              >
                Get in Touch
              </h2>
              <p
                className={cn(
                  'text-lg mb-8',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                Have questions? Connect with us through any of these channels:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '📍', label: siteConfig.contact.address },
                  { icon: '📞', label: siteConfig.contact.phone },
                  { icon: '✉️', label: siteConfig.contact.email },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-2xl">{contact.icon}</span>
                    <span
                      className={cn(isDark ? 'text-gray-300' : 'text-gray-700')}
                    >
                      {contact.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-6 mb-8">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'text-2xl transition-colors',
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-blue-500'
                      )}
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* QR Codes */}
            <div className="grid grid-cols-2 gap-8">
              <QRCode
                src={siteConfig.contact.whatsapp.qr || '/qr/whatsapp-qr.png'}
                alt="WhatsApp QR Code"
                title="WhatsApp"
                description={`Scan to chat on WhatsApp`}
                isDark={isDark}
              />
              <QRCode
                src={siteConfig.contact.wechat.qr || '/qr/wechat-qr.png'}
                alt="WeChat QR Code"
                title="WeChat"
                description={`Scan to connect: ${siteConfig.contact.wechat.label}`}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
