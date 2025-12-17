'use client';

import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  type LucideIcon 
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  FaLinkedin: Linkedin,
  FaTwitter: Twitter,
  FaInstagram: Instagram,
  FaFacebook: Facebook,
};

interface IconProps {
  icon: keyof typeof icons;
  className?: string;
}

export function Icon({ icon, className }: IconProps) {
  const IconComponent = icons[icon];
  return <IconComponent className={className} />;
} 