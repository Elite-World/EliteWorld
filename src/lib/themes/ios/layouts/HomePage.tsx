'use client';

import { Article, Category } from '@/lib/types/content';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { useUnsplashImage } from '@/lib/hooks/useUnsplashImage';
import { Icon } from '@/components/Icon';
import { QRCode } from '@/components/QRCode';

// Add subdomain config at the top of the file
const subdomains = {
  immigration: 'https://immi.eliteworld.top',
  education: 'https://edu.eliteworld.top'
} as const;

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
      setProgress(prev => {
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
    <div className={cn(
      'fixed inset-0 z-50 flex flex-col items-center justify-center',
      'transition-colors duration-300',
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    )}>
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
      <div className={cn(
        'mt-4 text-sm font-medium',
        isDark ? 'text-gray-400' : 'text-gray-600'
      )}>
        Loading... {progress}%
      </div>
    </div>
  );
}

interface HomePageProps {
  categories: Category[];
  articles: Article[];
}

// Hero background component with fallback
function HeroBackground() {
  const [imageError, setImageError] = useState(false);
  const { imageUrl, isLoading, error } = useUnsplashImage('global globe country prospect');
  const [bgType, setBgType] = useState<'og' | 'unsplash' | 'gradient'>('og');
  
  // Handle OG image error
  const handleOgError = () => {
    console.log('OG Image failed to load, falling back to Unsplash');
    setBgType('unsplash');
  };

  // Handle Unsplash image error
  const handleUnsplashError = () => {
    console.log('Unsplash Image failed to load, falling back to gradient');
    setBgType('gradient');
    setImageError(true);
  };
  
  return (
    <>
      {/* Fallback gradient background - always present */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 z-0" />
      
      {/* OG Image */}
      {bgType === 'og' && siteConfig.ogImage && (
        <>
          <Image
            src={siteConfig.ogImage}
            alt="Background"
            fill
            className={cn(
              "object-cover object-center z-0",
              "transition-opacity duration-1000"
            )}
            onError={handleOgError}
            priority
          />
          <div className="absolute inset-0 bg-black/30 z-0" />
        </>
      )}
      
      {/* Unsplash image with overlay */}
      {bgType === 'unsplash' && !imageError && imageUrl && !isLoading && !error && (
        <>
          <Image
            src={imageUrl}
            alt="Background"
            fill
            className={cn(
              "object-cover object-center z-0",
              "transition-opacity duration-1000"
            )}
            onError={handleUnsplashError}
            priority
          />
          <div className="absolute inset-0 bg-black/30 z-0" />
        </>
      )}
    </>
  );
}

// Define the social media links with proper icon types
const socialLinks = [
  { icon: 'FaLinkedin' as const, href: siteConfig.links.linkedin },
  { icon: 'FaTwitter' as const, href: siteConfig.links.twitter },
  { icon: 'FaInstagram' as const, href: '#' },
  { icon: 'FaFacebook' as const, href: '#' }
] as const;

export function HomePage({ 
  categories,
  articles 
}: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { Card, ArticleCard } = themes.ios.components;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <CompanyLoadingPage />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section 
        id="hero-section"
        className="relative -mt-16"
      >
        {/* Background */}
        <HeroBackground />
        
        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center pt-16">
            <h1 className={cn(
              "text-5xl md:text-6xl font-bold mb-6",
              "text-white"
              // "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            )}>
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-12 text-white/90">
              <em><strong>Dream Big</strong> | Expert Guidance for Study and Immigration</em>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
              {[
                { label: 'IMMIGRATION', href: subdomains.immigration },
                { label: 'EDUCATION', href: subdomains.education }
              ].map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    // Base styles
                    "px-8 py-3 rounded-lg text-lg font-medium text-center",
                    "text-white border-2 border-white/30",
                    // Glass effect
                    "backdrop-blur-sm bg-white/5",
                    // Hover effects
                    "hover:bg-white/15 hover:border-white/50",
                    // Transitions
                    "transition-all duration-300",
                    // Transform on hover
                    "hover:scale-105",
                    // Subtle shadow
                    "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                    "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  )}
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className={cn(
            "text-4xl font-bold text-center mb-16",
            "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          )}>
            Our Global Impact
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                number: "1000+", 
                label: "Success Stories",
                description: "Students placed in top institutions worldwide"
              },
              { 
                number: "50+", 
                label: "Partner Universities",
                description: "Direct partnerships with leading institutions"
              },
              { 
                number: "98%", 
                label: "Success Rate",
                description: "Visa and admission application success"
              },
              { 
                number: "10+", 
                label: "Years Experience",
                description: "Decade of excellence in education consulting"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  "text-center p-8 rounded-2xl transition-all duration-300",
                  "hover:transform hover:-translate-y-1",
                  isDark 
                    ? "bg-gray-800 hover:bg-gray-700" 
                    : "bg-white hover:bg-blue-50 shadow-lg"
                )}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className={cn(
            "text-4xl font-bold text-center mb-6",
            isDark ? "text-gray-100" : "text-gray-800"
          )}>
            Meet Our Expert Team
          </h2>
          <p className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>
            Our experienced consultants are dedicated to guiding you through every step of your educational journey
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Education Consultant",
                image: "/team/sarah.jpg",
                speciality: "UK & US Universities"
              },
              {
                name: "Michael Zhang",
                role: "Immigration Specialist",
                image: "/team/michael.jpg",
                speciality: "Visa & Immigration"
              },
              {
                name: "Emma Liu",
                role: "Career Advisor",
                image: "/team/emma.jpg",
                speciality: "Career Planning"
              }
            ].map((member, index) => (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl overflow-hidden transition-all duration-300",
                  "hover:transform hover:-translate-y-1",
                  isDark ? "bg-gray-800" : "bg-white shadow-lg"
                )}
              >
                <div className="aspect-w-3 aspect-h-4 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className={cn(
                    "text-sm mb-2",
                    isDark ? "text-blue-400" : "text-blue-600"
                  )}>
                    {member.role}
                  </p>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
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
            Book a free consultation with our experts and take the first step towards your international education goals
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
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className={cn(
                "text-4xl font-bold mb-6",
                isDark ? "text-gray-100" : "text-gray-800"
              )}>
                Get in Touch
                </h2>
              <p className={cn(
                "text-lg mb-8",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                Have questions? Connect with us through any of these channels:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "📍", label: "123 Education Street, City, Country" },
                  { icon: "📞", label: "+1 234 567 890" },
                  { icon: "✉️", label: "contact@eliteworld.com" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-2xl">{contact.icon}</span>
                    <span className={cn(
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      {contact.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-6 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-2xl transition-colors",
                      isDark 
                        ? "text-gray-400 hover:text-white" 
                        : "text-gray-600 hover:text-blue-500"
                    )}
                  >
                    <Icon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* QR Codes */}
            <div className="grid grid-cols-2 gap-8">
              <QRCode
                src="/qr/whatsapp-qr.png"
                alt="WhatsApp QR Code"
                title="WhatsApp"
                description="Scan to chat on WhatsApp"
                isDark={isDark}
              />
              <QRCode
                src="/qr/wechat-qr.png"
                alt="WeChat QR Code"
                title="WeChat"
                description="Scan to connect on WeChat"
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 