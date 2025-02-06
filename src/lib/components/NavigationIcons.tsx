'use client';

import { 
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineInformationCircle,
  HiOutlineComputerDesktop,
  HiOutlineHeart,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import type { ReactNode } from 'react';

export const navigationIcons: Record<string, ReactNode> = {
  // Main navigation
  home: <HiOutlineHome className="w-5 h-5" />,
  categories: <HiOutlineSquares2X2 className="w-5 h-5" />,
  about: <HiOutlineInformationCircle className="w-5 h-5" />,

  // Category children
  tech: <HiOutlineComputerDesktop className="w-5 h-5" />,
  lifestyle: <HiOutlineHeart className="w-5 h-5" />,
  business: <HiOutlineBriefcase className="w-5 h-5" />,

  // About children
  team: <HiOutlineUserGroup className="w-5 h-5" />,
  contact: <HiOutlineEnvelope className="w-5 h-5" />
}; 